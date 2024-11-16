const express = require("express");

const { getAllProducts, createNewProduct } = require("../controllers/productController");



const router = express.Router();

// router.Method(path, handler)
// const initAPIRoutes = (app) => {
//   router.get("/users", getAllUsers);

//   router.post("/create-user", createNewUser);

//   router.put("/update-user/:id", updateUser);

//   router.delete("/delete-user/:id", deleteUser);

//   return app.use("/api/v1/", router);
// };

const initAPIRoutes = (app) => {
  router.get("/product", getAllProducts);
  router.post('/product/create',createNewProduct);

  // router.post("/create-user", createNewUser);

  // router.put("/update-user/:id", updateUser);

  // router.delete("/delete-user/:id", deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
