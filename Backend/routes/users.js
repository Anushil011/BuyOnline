const express = require("express");
const { check, validationResult } = require("express-validator");

const userControllers = require("./user-controllers");

const router = express.Router();

/************** sign up route **************/
router.post("/signup", userControllers.signUp);

/************** login route **************/
router.post("/login", userControllers.login);

/************** get user route **************/
router.get("/logout", userControllers.logout);

/************** get user route **************/
router.get("/user", userControllers.getUser);

/************** get watchlist items route **************/
router.get("/watchlist", userControllers.getWatchlistItems);

/************** add watchlist item route **************/
router.post("/watchlist/add", userControllers.addWatchlistItem);

/************** delete watchlist item route **************/
router.post("/watchlist/delete", userControllers.deleteWatchlistItem);

/************** get cart items route **************/
router.get("/cart", userControllers.getCartItems);

/************** add cart item route **************/
router.post("/cart/add", userControllers.addCartItem);

/************** delete cart item route **************/
router.post("/cart/delete", userControllers.deleteCartItem);

/************** get purchased items route **************/
router.get("/purchased", userControllers.getPurchasedItems);

/*************** Delete a user route *************/
router.get("/delete", userControllers.deleteUser);

module.exports = router;
