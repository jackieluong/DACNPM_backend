const connection = require("../config/database");

// Lấy giỏ hàng của người dùng
let getCart = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            message: 'Người dùng chưa xác thực.'
        });
    }
    try {
        const [results] = await connection.execute("SELECT * FROM Cart WHERE user_id = ?", [req.user.id]);
        return res.status(200).json({
            message: 'ok',
            data: results
        });
    } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error.message);
        return res.status(500).json({
            message: 'Lỗi khi lấy giỏ hàng',
            error: error.message
        });
    }
};
// Thêm sản phẩm vào giỏ hàng
let  addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({
            message: 'Product ID and quantity are required.'
        });
    }
    try {
        const [results] = await connection.execute(
            `INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
            [req.user.id, product_id, quantity, quantity]
        );

        return res.status(201).json({
            message: 'Product added to cart successfully',
            newCartID: results.insertId
        });
    } catch (error) {
        console.error("Error adding product to cart:", error.message);
        return res.status(500).json({
            message: 'Error adding product to cart',
            error: error.message
        });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ
let updateCartItem = async (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({
            message: 'Product ID and quantity are required.'
        });
    }
    try {
        await connection.execute(
            `UPDATE Cart SET quantity = ? WHERE user_id = ? AND product_id = ?`,
            [quantity, req.user.id, product_id]
        );

        return res.status(200).json({
            message: 'Cart item updated successfully'
        });
    } catch (error) {
        console.error("Error updating cart item:", error.message);
        return res.status(500).json({
            message: 'Error updating cart item',
            error: error.message
        });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
let removeFromCart = async (req, res) => {
    const { product_id } = req.body;
    if (!product_id) {
        return res.status(400).json({
            message: 'Product ID is required.'
        });
    }
    try {
        await connection.execute(
            `DELETE FROM Cart WHERE user_id = ? AND product_id = ?`,
            [req.user.id, product_id]
        );

        return res.status(200).json({
            message: 'Product removed from cart successfully'
        });
    } catch (error) {
        console.error("Error removing product from cart:", error.message);
        return res.status(500).json({
            message: 'Error removing product from cart',
            error: error.message
        });
    }
};

// Xuất các hàm
module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
};