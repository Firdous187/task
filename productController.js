const Product = require("../models/product");
const csv = require("csv-parser");
const fs = require("fs");

/* CREATE PRODUCT */

exports.createProduct = async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.json(product);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/* GET ALL PRODUCTS */

exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/* UPDATE PRODUCT */

exports.updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/* DELETE PRODUCT */

exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product Deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/* CSV UPLOAD */

exports.uploadCSV = async (req, res) => {

  const results = [];
  const failed = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())

    .on("data", (row) => {

      if (!row.name || !row.price) {

        failed.push({
          row,
          error: "Missing required fields"
        });

      } else {

        results.push(row);

      }

    })

    .on("end", async () => {

      if (results.length > 0) {

        await Product.insertMany(results);

      }

      res.json({

        totalRows: results.length + failed.length,
        inserted: results.length,
        failed: failed

      });

    });

};