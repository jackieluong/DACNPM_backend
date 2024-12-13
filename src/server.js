const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine");
const connection = require("./config/database");
const initAPIRoutes = require("./routes/api");
const cors = require("cors");


// Create the connection to database

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || 'localhost'; // Use HOSTNAME from .env or fallback to localhost


// Config req body
app.use(express.json());
app.use(express.urlencoded({extend: true}));
// Config template engine
configViewEngine(app);

// app.use("/", webRoutes);


// 
initAPIRoutes(app);

// connection.connect((err) => {
//   if (err) {
//     throw err;
//   }

//   console.log("Connected to database done");
// });


app.get("/", (req, res) => {
  res.send("Hello world");
});


app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
