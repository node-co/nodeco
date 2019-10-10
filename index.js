const express = require("express");
const methodOverride = require("express-method-override")("_method");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const port = 3000;
//const mongoose = require("mongoose");
const viewDir = `${__dirname}/views`;
app.use(express.static(`${__dirname}/public`));
app.set("views", viewDir);
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride);

app.get("/", async (req, res) => {
  res.render("pages/home", { variable: "hola soy una variable" });
});

app.get("/bootcamp-2019", async (req, res) => {
  const { query } = req;
  res.render("pages/bootcamp-2019", { query });
});

app.get("/certificados/:id", async (req, res) => {
  const certificadoId = req.params.id;
  const uuidV4 = require("uuid/v4");
  const PDFDocument = require("pdfkit");
  const path = require("path");
  const appDir = path.dirname(require.main.filename);
  let options = { size: "letter", layout: "landscape", margin: 5 };
  const doc = new PDFDocument(options);
  let filename = uuidV4();
  filename = encodeURIComponent(filename) + ".pdf";
  res.setHeader(
    "Content-disposition",
    'attachment; filename="' + filename + '"'
  );
  res.setHeader("Content-type", "application/pdf");
  doc.fontSize(13);
  doc.font("Helvetica");
  doc.text(`El id es ${certificadoId}`, 320, 55);
  doc.pipe(res);
  doc.end();
});

app.listen(port, () => {
  console.log(`app corriendo en http://localhost:${port}`);
});
