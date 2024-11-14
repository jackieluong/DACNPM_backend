const express = require("express");
const { getAllCourses, createNewCourse } = require("../controllers/courseController");



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
  router.get("/course", getAllCourses);
  router.post('/course/create', createNewCourse);

  // router.post("/create-user", createNewUser);

  // router.put("/update-user/:id", updateUser);

  // router.delete("/delete-user/:id", deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
