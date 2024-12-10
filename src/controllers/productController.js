const connection = require("../config/database");


let getAllProducts = async (req, res) => {
    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute("SELECT * FROM Product");

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get product successfully'
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


let getProductByID = async (req, res) => {
    try {
        console.log(req.params);
        let {id } = req.params;

        // Execute the query to fetch a course by ID
        const [results, fields] = await connection.execute("SELECT * FROM Product WHERE product_id = ?", [id]);

        // Respond with the fetched course
        return res.status(200).json({
            message: 'ok',
            data: results,
            description: 'Get product successfully'
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




let createNewProduct = async (req, res) => {
    try {
        let { name, price,brand, description, quantity, category, imgUrl } = req.body;

        
        if (!name || !description || !quantity || !category) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        // Execute the query to insert a new course
        const [results, fields] = await connection.execute(
            `INSERT INTO Product( name, price, brand, description, quantity, category, imgUrl) VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
            [name, price,brand, description, quantity, category, imgUrl]
        );

        const id = results.insertId;
        console.log("Create new product with ID:", id);
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



let updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, price,brand, description, quantity, category, imgUrl } = req.body;

        
        
        if (!id) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        // Execute the query to update the course
        const [results, fields] = await connection.execute(
            `UPDATE Product SET name = ?, price = ?, brand = ?, description = ?, quantity = ?, category = ?, imgUrl = ? WHERE product_id = ?`,
            [name, price,brand, description, quantity, category, imgUrl, id]
        );

        console.log("Update successfully product with ID:", id);
        // Respond with a success message
        return res.status(200).json({
            message: 'Product updated successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error updating product:", error.message);
        return res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};


let deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        // Execute the query to delete the course
        const [results, fields] = await connection.execute(
            `DELETE FROM Product WHERE product_id = ?`,
            [id]
        );

        console.log("Delete successfully product with ID:", id);
        // Respond with a success message
        return res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error deleting product:", error.message);
        return res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};

let searchProduct = async (req, res) => {
    try {
        console.log("Search keyword:", req.query);
        let { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        keyword = keyword.trim();
        // Execute the query to delete the course
        const [results, fields] = await connection.execute(
            `SELECT * FROM Product WHERE LOWER(name) LIKE ?`,
            [`%${keyword.toLowerCase()}%`]
        );

        console.log("Search successfully product with keyword:", keyword);
        // Respond with a success message
        return res.status(200).json({
            message: 'Search successfully',
            count: results.length,
            data: results
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error searching product:", error.message);
        return res.status(500).json({
            message: 'Error searching product',
            error: error.message
        })
}
}
module.exports = {
    getAllProducts,
    createNewProduct,
    deleteProduct,
    updateProduct,
    getProductByID,
    searchProduct,
};
