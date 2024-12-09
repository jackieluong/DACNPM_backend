const connection = require("../config/database");

const getAllOrders = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM AppOrder"
    );

    return res.status(200).json({
      message: "ok",
      data: results,
    });
  } catch (error) {
    console.error("Error fetching order:", error.message);
    return res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, payment_status } = req.body;
  console.log("request for updating order: ", req.body);
  try {
    const [results, fields] = await connection.execute(
      "UPDATE AppOrder SET status = ?, payment_status = ? WHERE order_id = ?",
      [status, payment_status, id]
    );
    console.log("Update successfully order with ID:", id);
    return res.status(200).json({
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Error updating order:", error.message);
    return res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

const getOrderDetail = async (req, res) => {
  let { id } = req.params;
  try {

    
    let query = `SELECT o.*, u.user_id, u.name as user_name, u.email, c.quantity, p.name, p.price, p.imgUrl  
        FROM AppOrder o, AppUser u, Contain c, Product p 
        WHERE o.order_id = ? AND o.user_id = u.user_id AND c.order_id = o.order_id AND c.product_id = p.product_id`;


    const[rows] = await connection.execute(query, [id]);
    // const [order] = await connection.execute(`SELECT * FROM AppOrder WHERE order_id = ?`, [id]);


    // let customer_query = `SELECT u.name, u.email FROM AppUser u, AppOrder o WHERE u.user_id = o.user_id AND o.order_id = ?`;
    // const [customer] = await connection.execute(customer_query, [id]);
    
    // let products_query =  `SELECT c.quantity, p.name, p.price FROM Contain c, Product p WHERE c.order_id = ? AND c.product_id = p.product_id`;
    
    // const [products] = await connection.execute(products_query, [id]);

    
    // const results = {
    //   order,
    //   user: customer[0],
    //   products: products
    // }
    
    
    const user = {
      user_id: rows[0].user_id,
      user_name: rows[0].user_name,
      email: rows[0].email,
    }

    const products = rows.map((row) => {
      return {
        name: row.name,
        price: row.price,
        quantity: row.quantity,
        imgUrl: row.imgUrl
      }
    })
    
    const results = {
      order_id: rows[0].order_id,
      order_time: rows[0].order_time,
      ship_fee: rows[0].ship_fee,

      payment_status: rows[0].payment_status,
      payment_method: rows[0].payment_method,
      status: rows[0].status,
      address: rows[0].address,
      user: user,
      products: products

    }
    console.log(results);
    return res.status(200).json({
      message: "ok",
      data: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching order detail",
      error: error.message,
    });
  }
};



module.exports = {
  getAllOrders,
  updateOrder,
  getOrderDetail,
};
