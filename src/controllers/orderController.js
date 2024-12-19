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
    // console.log(results);
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


const createOrder = async (req, res) => {
  const {products, address, payment_method, ship_fee} = req.body;

  const userID = req.user.id;
  console.log("user with email: ", req.user.email, " request for creating order: ");
  const order_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const status = "Processing";
  const payment_status = "Not Completed";

  
  try {
    const [results, fields] = await connection.execute(
      "INSERT INTO AppOrder (user_id, order_time, status, payment_status, address, payment_method, ship_fee) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userID, order_time, status, payment_status, address, payment_method, ship_fee]
    );
    const order_id = results.insertId;


    await connection.execute(
      `INSERT INTO Make(order_id, user_id) VALUES (?, ?)`,
      [order_id, userID]
    )
    products.forEach(async (product) => {
      const [results, fields] = await connection.execute(
        "INSERT INTO Contain (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [order_id, product.product.product_id, product.quantity]
      );
    });

    return res.status(200).json(
      {
        message: "Order created successfully",
        order_id: order_id
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
  
};

const getOrderDetailByID = async (orderID) => {
  const [rows] = await connection.execute(
    `SELECT *, c.quantity as cart_quantity
    FROM AppOrder o
    JOIN Contain c ON o.order_id = c.order_id
    JOIN Product p ON c.product_id = p.product_id
    WHERE o.order_id = ?`,
    [52]
  );

  const products = rows.map((row) => {
    return {
      name: row.name,
      price: row.price,
      quantity: row.cart_quantity,
      imgUrl: row.imgUrl,
    }
  })

  const result = {
    order_id: rows[0].order_id,
    status: rows[0].status,
    ship_fee: rows[0].ship_fee,
    products
  }

  

  return result;
}
const getUserOrder = async (req, res) => {
  const userID = req.user.id;
  try {
    
    const [ordersID] = await connection.execute(
      "SELECT order_id FROM Make WHERE user_id = ?",
      [userID]
    );
    
    if(ordersID.length === 0) {
      return res.status(200).json({
        message: "ok",
        data: [],
        desciption: "No order found"
      });
    }

    // let orders_ID = ordersID.map((order) => {
    //   return order.order_id;
    // });
    
    // console.log("Orders ID: ", orders_ID);
    // const orders = orders_ID.map((orderID) => {
    //   return getOrderDetailByID(orderID);
    // });

    // // const [rows] = await connection.execute(
    // //   `SELECT *, c.quantity as cart_quantity
    // //   FROM AppOrder o
    // //   JOIN Contain c ON o.order_id = c.order_id
    // //   JOIN Product p ON c.product_id = p.product_id
    // //   WHERE o.order_id = ?`,
    // //   [52]
    // // );

    // let orderIDs = ordersID.map((order) => {
    //   return order.order_id;
    // })
    // console.log("Orders ID: ", orderIDs);
    const [orderData] = await connection.execute(
      `SELECT o.order_id, o.status, o.ship_fee,p.product_id, p.name, p.price, p.imgUrl, c.quantity as cart_quantity
    FROM AppOrder o
    JOIN Contain c ON o.order_id = c.order_id
    JOIN Product p ON c.product_id = p.product_id
    WHERE o.order_id IN (SELECT order_id FROM Make m WHERE user_id = ?)`,
      [userID]
    );
    
    const orderMap = {};
    orderData.forEach((order) => {
      if(!orderMap[order.order_id]){
        orderMap[order.order_id] = {
          order_id: order.order_id,
          status: order.status,
          ship_fee: order.ship_fee,
          products: []
        }
      }
      orderMap[order.order_id].products.push({
        product_id: order.product_id,
        name: order.name,
        price: order.price,
        quantity: order.cart_quantity,
        imgUrl: order.imgUrl
      })
    })

    const rows = Object.values(orderMap);
    
    return res.status(200).json({
      message: "ok",
      data: rows,
    });
// {
//     "order_id": 52,        
//     "status": "Processing",
//     "ship_fee": 20000,
//     "products": [
//       {
//         "name": "Product 1"
//       }
//       {
//         "name": "Product 2"
//       }
//     ]
//     }
// }
  } catch (error) {
    console.error("Error fetching order:", error.message);
    return res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
}
module.exports = {
  getAllOrders,
  updateOrder,
  getOrderDetail,
  createOrder,
  getUserOrder,
};
