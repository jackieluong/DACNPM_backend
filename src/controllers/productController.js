const connection = require("../config/database");



let getAllProducts = async (req, res) => {
    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute("SELECT * FROM product");

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
};

let createNewProduct = async (req, res) => {
    try {
        let { id, name, price, color, brand, description, size, quantity, category } = req.body;

        
        if (!name || !fee || !description || !status) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        // Execute the query to insert a new course
        const [results, fields] = await connection.execute(
            `INSERT INTO product(product_id, name_, price, color, brand, description_,size_, quantity, category) VALUES (?, ?, ?, ?, ?)`,
            [id, name, price, color, brand, description, size, quantity, category]
        );

        // Respond with a success message
        return res.status(201).json({
            message: 'Product created successfully',
            newProductID: id
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error creating product:", error.message);
        return res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    createNewProduct,
};
