const connection = require("../config/database");


let countTotalRevenue = async (req, res) => {

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
            SELECT SUM(c.quantity * p.price) AS total_revenue
            FROM Contain c
            JOIN AppOrder o ON c.order_id = o.order_id
            JOIN Product p ON c.product_id = p.product_id
            WHERE o.payment_status = 'Completed' AND o.order_time BETWEEN ? AND ?`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results[0],
            description: 'Get total revenue successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

let countTotalOrders = async (req, res) => {

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
           SELECT COUNT(*) AS total_orders 
            FROM AppOrder o
            WHERE o.order_time BETWEEN ? AND ?`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results[0],
            description: 'Get total orders successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};
let countDeliveredOrders = async (req, res) => {

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
           SELECT COUNT(*) AS total_orders_delivered
            FROM AppOrder o
            WHERE o.status = 'Delivered' AND o.order_time BETWEEN ? AND ?`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results[0],
            description: 'Get total orders delivered successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};


let countShippingOrders = async (req, res) => {

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
           SELECT COUNT(*) AS total_orders_shipping
            FROM AppOrder o
            WHERE o.status = 'Shipping' AND o.order_time BETWEEN ? AND ?`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results[0],
            description: 'Get total orders shipping successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

let getRevenueByMonth = async (req, res) => {

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
            SELECT MONTH(o.order_time) AS month, SUM(c.quantity * p.price) AS revenue
            FROM Contain c
            JOIN AppOrder o ON c.order_id = o.order_id
            JOIN Product p ON c.product_id = p.product_id
            WHERE o.payment_status = 'Completed' AND o.order_time BETWEEN ? AND ?
            GROUP BY MONTH(o.order_time)
            ORDER BY MONTH(o.order_time) ASC`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get revenue by month successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};

let getRevenueByCategory = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
            SELECT p.category, SUM(c.quantity * p.price) AS revenue
            FROM Contain c
            JOIN AppOrder o ON c.order_id = o.order_id
            JOIN Product p ON c.product_id = p.product_id
            WHERE o.payment_status = 'Completed' AND o.order_time BETWEEN ? AND ?
            GROUP BY p.category
            ORDER BY revenue DESC`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get revenue by category successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }   
}

let getRevenueByBrand = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
            SELECT p.brand, SUM(c.quantity * p.price) AS revenue
            FROM Contain c
            JOIN AppOrder o ON c.order_id = o.order_id
            JOIN Product p ON c.product_id = p.product_id
            WHERE o.payment_status = 'Completed' AND o.order_time BETWEEN ? AND ?
            GROUP BY p.brand
            ORDER BY revenue DESC`,
            [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get revenue by brand successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
}

let getTopSellingProducts = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute(`
             SELECT  p.product_id,  p.name, p.price, p.imgUrl, SUM(c.quantity) AS total_quantity
            FROM Contain c
            JOIN AppOrder o ON c.order_id = o.order_id
            JOIN Product p ON c.product_id = p.product_id
            WHERE o.payment_status = 'Completed' AND o.order_time BETWEEN ? AND ?
            GROUP BY p.product_id, p.price, p.name, p.imgUrl
            ORDER BY total_quantity DESC
            LIMIT 10`, [startDate, endDate]
        );

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get top selling products successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
}
module.exports = {
    countTotalRevenue,
    countTotalOrders,
    countDeliveredOrders,
    countShippingOrders,
    getRevenueByMonth,
    getRevenueByCategory,
    getRevenueByBrand,
    getTopSellingProducts
};
