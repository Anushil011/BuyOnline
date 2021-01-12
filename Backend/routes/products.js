const express = require("express");
const { check } = require("express-validator");

const productControllers = require("./product-controllers");

const router = express.Router();

/*************** Get products route *************/

router.get("/products", productControllers.getProducts);

/*************** Add a product route *************/
router.post(
  "/products/add",
  [
    check("name").not().isEmpty(),
    check("price").isNumeric(),
    check("quantity").isNumeric(),
  ],
  productControllers.addProduct
);

/*************** Get a product route *************/
router.get("/products/:id", productControllers.getProduct);

/*************** Edit a product route *************/
router.post(
  "/products/edit/:id",
  [
    check("name").not().isEmpty(),
    check("price").isNumeric(),
    check("quantity").isNumeric(),
  ],
  productControllers.editProduct
);

/*************** search products route *************/
router.delete("/products/search", productControllers.searchProducts);

/*************** Delete a product route *************/
router.delete("/products/delete/:id", productControllers.deleteProduct);

module.exports = router;
