const express = require("express");

const { getAllProducts, createNewProduct, deleteProduct, updateProduct, getProductByID, searchProduct } = require("../controllers/productController");
const { handleLogin, handleRegister, getUser, getUserAccount, updateUserAccount } = require("../controllers/userController");
const { updateOrder, getAllOrders, getOrderDetail, createOrder, getUserOrder } = require("../controllers/orderController");
const { getAllCustomers } = require("../controllers/customerController");
const { getCartItems, addToCart, updateQuantity, removeFromCart } = require("../controllers/cartController");
const auth = require("../middleware/jwtAuth");


const {getAllUsers, createNewUser, updateUser, deleteUser} = require("../controllers/userController");
const { countTotalRevenue, countTotalOrders, countDeliveredOrders, countShippingOrders, getRevenueByMonth, getRevenueByCategory, getRevenueByBrand, getTopSellingProducts } = require("../controllers/dashboardController");

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
  router.get("/product", getAllProducts);
  router.get('/product/search', searchProduct);
  
  router.post('/product/create',createNewProduct);
  router.delete('/product/:id',deleteProduct)
  router.put('/product/edit/:id',updateProduct);
  router.get("/product/:id", getProductByID);


  // User


  router.post('/login', handleLogin);
  router.post('/register', handleRegister);
  router.get('/user',auth,  getUser);
  router.get('/user/account', auth, getUserAccount);
  router.put('/user/account', auth, updateUserAccount);
  // Order
  router.get('/order', getAllOrders);
  router.get('/order/user', auth, getUserOrder);
  router.post('/order/create',auth, createOrder);
  router.put('/order/edit/:id', updateOrder);
  router.get('/order/:id', getOrderDetail);
  // Customer
  router.get('/customer', getAllCustomers);

  // Cart

  router.get('/cart', auth, getCartItems);
  router.post('/cart/add', auth, addToCart);
  router.post('/cart/update', auth, updateQuantity);
  router.delete('/cart', auth, removeFromCart);
  // Promotion



  // Dashboard
  
  router.get('/dashboard/revenue', countTotalRevenue)
  router.get('/dashboard/orders', countTotalOrders)
  router.get('/dashboard/orders-delivered', countDeliveredOrders);
  router.get('/dashboard/orders-shipping', countShippingOrders);
  router.get('/dashboard/revenue/month', getRevenueByMonth);
  router.get('/dashboard/revenue/category', getRevenueByCategory);
  router.get('/dashboard/revenue/brand', getRevenueByBrand);
  router.get('/dashboard/product/top-selling', getTopSellingProducts);
//   router.get("/users", getAllUsers);
//   router.post("/create-user", createNewUser);
//   router.put("/update-user/:id", updateUser);
//   router.delete("/delete-user/:id", deleteUser);



  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
