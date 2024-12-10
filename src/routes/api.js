const express = require("express");

const { getAllProducts, createNewProduct, deleteProduct, updateProduct, getProductByID } = require("../controllers/productController");
const { handleLogin, handleRegister } = require("../controllers/userController");
const { updateOrder, getAllOrders, getOrderDetail } = require("../controllers/orderController");
const { getAllCustomers } = require("../controllers/customerController");


const {getAllUsers, createNewUser, updateUser, deleteUser} = require("../controllers/userController");
const {getCart, addToCart, removeFromCart, updateCartItem }= require("../controllers/cartController");

const router = express.Router();

// router.Method(path, handler)
// const initAPIRoutes = (app) => {
//   router.get("/users", getAllUsers);

//   router.post("/create-user", createNewUser);

//   router.put("/update-user/:id", updateUser);

//   router.delete("/delete-user/:id", deleteUser);

//   return app.use("/api/v1/", router);
// };
// urlbase: localhost:8080/api/v1/product
const initAPIRoutes = (app) => {
  // Routes cho giỏ hàng
  router.get('/cart', getCart);
  router.post('/cart/add', addToCart);
  router.put('/cart/update', updateCartItem);
  router.delete('/cart/remove', removeFromCart);

  // Routes cho sản phẩm
  router.get("/product", getAllProducts);
  router.post('/product/create',createNewProduct);
  router.delete('/product/:id',deleteProduct)
  router.put('/product/edit/:id',updateProduct);
  // router.post("/create-user", createNewUser);

  // router.put("/update-user/:id", updateUser);

  // router.delete("/delete-user/:id", deleteUser);

  router.get("/users", getAllUsers);
  router.post("/create-user", createNewUser);
  router.put("/update-user/:id", updateUser);
  router.delete("/delete-user/:id", deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
