const connection = require("../config/database");

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const [results] = await connection.execute("SELECT * FROM User");
        return res.status(200).json({
            message: 'ok',
            data: results
        });
    } catch (error) {
        console.error("Error fetching User:", error.message);
        return res.status(500).json({
            message: 'Error fetching User',
            error: error.message
        });
    }
};

// Tạo người dùng mới
const createNewUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        const [results] = await connection.execute(
            `INSERT INTO User (username, password, email) VALUES (?, ?, ?)`,
            [username, password, email]
        );

        const id = results.insertId;
        return res.status(201).json({
            message: 'User created successfully',
            newUserID: id
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        await connection.execute(
            `UPDATE User SET username = ?, email = ? WHERE user_id = ?`,
            [username, email, id]
        );

        return res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error("Error updating user:", error.message);
        return res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        await connection.execute(
            `DELETE FROM User WHERE user_id = ?`,
            [id]
        );

        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
};

// Xuất các hàm
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};