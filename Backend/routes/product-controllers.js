const { validationResult } = require("express-validator");

const Product = require("../models/products");
const HttpError = require("../models/http-error");

/*************** Get products route *************/
const getProducts = (req, res) => {
  Product.find()
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(404).json({ message: "No products found" });
      }
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

/*************** Add a product route *************/

const addProduct = (req, res) => {
  /******* input validation *********/
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Some error in the inputs", 422);
  }

  /******* getting the inputs *******/
  const { name, price, quantity, description, category } = req.body;

  /******* creating a new product *******/
  const newProduct = new Product({
    name,
    price,
    quantity,
    description,
    category,
  });

  newProduct
    .save()
    .then((result) => {
      res.json({ data: result, message: "Product added" });
    })
    .catch((err) => {res.json(err);console.log(err);});
};

/*************** Get a product route *************/
const getProduct = (req, res) => {
  const id = req.params.id;

  Product.findById({ _id: id })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(404).json({ message: "No products found" });
      }
      res.json(result);
    })
    .catch((err) => console.log(err));
};

/*************** Edit a product route *************/
const editProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Some error in the inputs", 422);
  }

  const { name, price, quantity, description, category } = req.body;
  let updateOps = {
    name,
    price,
    quantity,
    description,
    category,
  };

  Product.findByIdAndUpdate(req.params.id, updateOps, {
    new: true,
    useFindAndModify: false,
  })
    .then((result) => {
      res.json({ data: result, message: "Product updated" });
    })
    .catch((err) => console.log(err));
};

/*************** Delete a product route *************/
const deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => res.json({ message: "Product deleted", data: result }))
    .catch((err) => console.log(err));
};

/*************** search products route *************/
const searchProducts = (req, res) => {
  Product.find({ name: req.body.name })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.status(404).json({ message: "No products found" });
      }
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.searchProducts = searchProducts;
