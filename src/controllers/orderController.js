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
    let query = `SELECT o.*, u.user_id, u.name, u.email, c.quantity, p.name, p.price  
        FROM AppOrder o, AppUser u, Contain c, Product p 
        WHERE order_id = ? AND o.user_id = u.user_id AND c.order_id = o.order_id AND c.product_id = p.product_id`;

    const [results, fields] = await connection.execute(query, [id]);

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
