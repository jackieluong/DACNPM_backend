const connection = require("../config/database");


const getAllOrders = async (req, res) => {
    try {
        const [results, fields] = await connection.execute("SELECT * FROM `Order`");
        
        return res.status(200).json({
            message: 'ok',
            data: results
        });
    } catch (error) {
        console.error("Error fetching order:", error.message);
        return res.status(500).json({
            message: 'Error fetching order',
            error: error.message
        });
    }
}
const updateOrder = async (req, res) => {
    const {id} = req.params;
    const {status, payment_status} = req.body;
    console.log("request for updating order: ",req.body);
    try {
        const [results, fields] = await connection.execute(
            "UPDATE `Order` SET status = ?, payment_status = ? WHERE order_id = ?",
            [status, payment_status, id]
        );
        console.log("Update successfully order with ID:", id);
        return res.status(200).json({
            message: 'Order updated successfully'
        });
    } catch (error) {
        console.error("Error updating order:", error.message);
        return res.status(500).json({
            message: 'Error updating order',
            error: error.message
        });
    }
}

module.exports = {
    getAllOrders,
    updateOrder
}