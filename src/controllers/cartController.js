
const connection = require("../config/database");

let getCartItems = async (req, res) => {
  console.log(
    "User with email ",
    req.user.email,
    "request for getting cart items"
  );
  const userID = req.user.id;
  try {
  const [rows] = await connection.execute(
    `SELECT c.quantity as cart_quantity, p.*
        FROM Cart, Consisted c, Product p
        WHERE Cart.cart_id = c.cart_id AND c.product_id = p.product_id AND Cart.user_id = ?`,
    [userID]
  );
  const results = rows.map(row => ({
    product: {
      name: row.name,
      price: row.price,
      product_id: row.product_id,
      quantity: row.quantity,
      imgUrl: row.imgUrl,
      brand: row.brand,
      description: row.description,
      category: row.category
    },
    quantity: row.cart_quantity
  }));
  
    return res.status(200).json({
      message: "ok",
      data: results
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching cart items",
      error: error.message,
    });
  }
};

let updateQuantity = async (req, res) => {
  console.log(
    "User with email",
    req.user.email,
    "request for for update quantity"
  );

  const userID = req.user.id;
  const productID = req.body.product_id;
  const quantity = req.body.quantity;

  const connection_ = await connection.getConnection();
  await connection_.beginTransaction();
  try {
    const [rows] = await connection_.execute(
      `UPDATE Consisted JOIN Cart ON Consisted.cart_id = Cart.cart_id 
        SET Consisted.quantity = Consisted.quantity + ?
        WHERE Consisted.product_id = ? AND Cart.user_id = ?`,
      [quantity, productID, userID]
    );
    await connection_.commit();

    return res.status(200).json({
        message: "ok",
        description: "Updating quantity successfully",
      });
  } catch (error) {
    console.log(error);
    await connection_.rollback();
    return res.status(500).json({
      message: "Error updatin quantity",
      error: error.message,
    });
  }finally{
        // Always release the connection back to the pool
        connection_.release();
  }
};
let addToCart = async (req, res) => {
  console.log("User with email", req.user.email, "request for add to cart");

  const userID = req.user.id;
  const productID = req.body.product_id;
  const quantity = req.body.quantity;
  console.log("User id: ", userID);

  try {
    // const [rows] = await connection.execute(
    //     `INSERT INTO Cart (user_id)
    //      SELECT ? WHERE NOT EXISTS (SELECT 1 FROM Cart WHERE user_id = ?)`,
    //     [userID, userID]
    // );

    // const [results] = await connection.execute(
    //     `INSERT INTO Consisted (cart_id, product_id, quantity)
    //      SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM Consisted WHERE cart_id = ? AND product_id = ?)`,
    //     [results.insertId, productID, quantity, results.insertId, productID]
    // );

    // const [results] = await connection.execute(
    //     `INSERT INTO Consisted (cart_id, product_id, quantity)
    //     SELECT ?, ?, ?
    //     FROM Cart, Consisted
    //     WHERE Cart.user_id = ? AND Consisted.product_id = ? AND Cart.cart_id = Consisted.cart_id`,
    //     [userID]
    // );

    const [rows] = await connection.execute(
      `SELECT cart_id FROM Cart WHERE user_id = ?`,
      [userID]
    );
    // const cardID = rows.length > 0 ? rows[0].card_id : rows.insertId;

    // console.log("card_id: ", cardID);
    let cartID;
    console.log(rows);
    if (rows.length > 0) {
      // Already have cart record
      // const [existingProduct] = connection.execute(
      //     `SELECT quantity
      //     FROM Consisted, Cart
      //     WHERE Consisted.cart_id = Cart.cart_id AND Consisted.product_id = ? AND Cart.user_id = ?`,
      //     [productID, userID]
      // );
      cartID = rows[0].cart_id;
    } else {
      const [insertCardID] = await connection.execute(
        `INSERT INTO Cart(cart_id, user_id) 
            VALUES(?, ?)
            `,
        [userID, userID]
      );
      cartID = insertCardID.insertId;
      // No cart record

      // const [existingProduct] = connection.execute(
      //     `SELECT quantity
      //     FROM Consisted
      //     WHERE Consisted.product_id = ? AND Consisted.card_id = ?`,
      //     [productID, cardID]
      // );
    }

    const [existingProduct] = await connection.execute(
      `SELECT quantity
            FROM Consisted
            WHERE Consisted.product_id = ? AND Consisted.cart_id = ?`,
      [productID, cartID]
    );

    if (existingProduct.length > 0) {
      // IF items already exist in the cart
      const newQuantity = existingProduct[0].quantity + quantity;
      const [results] = await connection.execute(
        `UPDATE Consisted SET quantity = ? WHERE cart_id = ? AND product_id = ?`,
        [newQuantity, cartID, productID]
      );
    } else {
      const [results] = await connection.execute(
        `INSERT INTO Consisted (cart_id, product_id, quantity)
                VALUES (?, ?, ?)`,
        [cartID, productID, quantity]
      );
    }

    return res.status(200).json({
      message: "ok",
      description: "Add to cart successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

let removeFromCart = async (req, res) => {
    console.log(
      "User with email",
      req.user.email,
      "request for remove from cart"
    );
  
    
    const userID = req.user.id;
    const productID = req.body.product_id;
    // const quantity = req.body.quantity;
    try {
      const [rows] = await connection.execute(
        `DELETE Consisted
        FROM Consisted
        JOIN Cart ON Consisted.cart_id = Cart.cart_id
        WHERE Consisted.product_id = ? AND Cart.user_id = ?;
        `,
        [ productID, userID]
      );
      return res.status(200).json({
          message: "ok",
          description: "Remove from cart successfully",
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error remove from cart",
        error: error.message,
      });
    }
  };
module.exports = {
  getCartItems,
  addToCart,
  updateQuantity,
  removeFromCart,
};
