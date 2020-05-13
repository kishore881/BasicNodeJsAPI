var PORT = process.env.PORT || 3000;

const express = require("express");
const connectDB = require("./db/connect.js");
const router = require("./router/index");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

connectDB();
app.use("/", express.static("./views"));
app.use("/api", router);

app.listen(PORT);
