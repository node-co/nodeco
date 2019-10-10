const express = require("express");
const methodOverride = require("express-method-override")("_method");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const port = 3000;
//const mongoose = require("mongoose");
const viewDir = `${__dirname}/views`;
app.set("views", viewDir);
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride);

app.get("/", async (req, res) => {
  res.render("pages/home", { variable: "hola soy una variable" });
});

app.listen(port, () => {
  console.log(`API REST corriendo en http://localhost:${port}`);
});
