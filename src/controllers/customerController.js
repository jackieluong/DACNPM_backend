const connection = require("../config/database");



let getAllCustomers = async (req, res) => {
    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute("SELECT * FROM AppUser WHERE role = 'customer'");

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get customers successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching customers:", error.message);
        return res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
};


module.exports = {
    getAllCustomers,
};
