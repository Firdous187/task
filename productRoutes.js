const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/products", controller.createProduct);

router.get("/products", controller.getProducts);

router.put("/products/:id", controller.updateProduct);

router.delete("/products/:id", controller.deleteProduct);

router.post("/upload", upload.single("file"), controller.uploadCSV);

module.exports = router;