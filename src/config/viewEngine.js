const path = require("path");
const express = require('express');

//Config template engine
const configViewEngine = (app) => {
  app.set("views", path.join('./src', "views"));
  app.set("view engine", "ejs");
  // Config static file
  app.use(express.static(path.join('./src', "public")));
};

module.exports = configViewEngine;
