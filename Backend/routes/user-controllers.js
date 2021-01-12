const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const _ = require("lodash");

const User = require("../models/users");
const Product = require("../models/products");
const HttpErr = require("../models/http-error");

/***************************************************************************
 ****************************************************************************/
const getUser = (req, res, next) => {
  if (req.user) {
    res.send({
      message: "Successfully authenticated",
      isAdmin: req.user.isAdmin,
      watchlist: req.user.watchlist,
      cart: req.user.cart,
      purchased: req.user.purchased,
    });
  }
};

/***************************************************************************
 ****************************************************************************/
const signUp = async (req, res, next) => {
  //checking errors in input
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   throw new HttpError("Some error in the inputs", 422);
  // }

  const { name, email, password } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    const err = new HttpErr("Hashing password failed, please try again!", 500);
    return next(error);
  }
  let existingUser;

  /*********** check whether the user already exists or not**********/
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpErr("Sign up failed, please try again!", 500);
    return next(error);
  }

  if (existingUser) {
    const err = new HttpErr(
      "A user exists, Please try with different email!",
      500
    );
    return next(err);
  }

  /*********** create the new user **********/

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpErr("Sign up failed, please try again!", 500));
  }
  res.status(201).json({ message: "Sign up successful" });
};

/***************************************************************************
 ****************************************************************************/

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.json({
        message: "User doesnot exist. Please sign in!",
        link: "http://localhost:3000/signup",
      });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({
          message: "Successfully authenticated",
          isAdmin: req.user.isAdmin,
          watchlist: req.user.watchlist,
          cart: req.user.cart,
          purchased: req.user.purchased,
        });
      });
    }
  })(req, res, next);
};

/***************************************************************************
 ****************************************************************************/

const logout = (req, res, next) => {
  req.logout();
  res.json({ message: "Successfully logged out" });
};

/***************************************************************************
 ****************************************************************************/

const getWatchlistItems = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to get the watchlist items"), 500);
  }
  if (!user.watchlist) {
    return next(new HttpErr("No items found"), 404);
  }
  res.status(201).json(req.user);
};

/***************************************************************************
 ****************************************************************************/

const addWatchlistItem = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to add the item to watchlist"), 500);
  }
  if (user.watchlist.includes(req.body.itemId)) {
    return res
      .status(201)
      .json({ message: "The item is already in the watchlist" });
  } else {
    user.watchlist.push(req.body.itemId);
  }

  try {
    await user.save();
  } catch (error) {
    return next(new HttpErr("Failed to add the item to watchlist"), 500);
  }
  res.status(201).json({ message: "The item is added to the watchlist" });
};

/***************************************************************************
 ****************************************************************************/

const deleteWatchlistItem = async (req, res, next) => {
  let user;
  try {
    user = User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to delete the item from watchlist"), 500);
  }
  user.watchlist.pull(req.body.itemId);

  try {
    await user.save();
  } catch (error) {
    return next(new HttpErr("Failed to delete the item from watchlist"), 500);
  }
  res.status(201).json({ message: "The item is removed from the watchlist" });
};

/***************************************************************************
 ****************************************************************************/

const getCartItems = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to get the cart items"), 500);
  }
  if (!user.cart) {
    return next(new HttpErr("No items found"), 404);
  }
  console.log(user.cart);
  let cartItem;
  let cartItems = [];
  const getitems = () => {
    console.log("getinside");
    user.cart.map((id) => {
      Product.findById({ _id: id })
        .exec()
        .then((result) => {
          if (result.length < 1) {
            return res.status(404).json({ message: "No products found" });
          }
          cartItem = _.cloneDeep(result);
          console.log("item");
          console.log(cartItem);
          cartItems.push(cartItem);
          cartItems.push("asdfasdf");
          console.log(cartItems);
        })
        .catch((err) => console.log(err));
    });
    console.log("end");
    send();
  };
  const send = () => {
    console.log("send");
    res.status(201).json({ items: cartItems });
  };
  console.log("gret");
  getitems();
  //console.log(cartItems);
  //
};

/***************************************************************************
 ****************************************************************************/

const addCartItem = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to add the item to cart"), 500);
  }

  if (user.cart.includes(req.body.itemId)) {
    return res.status(201).json({ message: "The item is already in the cart" });
  } else {
    user.cart.push(req.body.itemId);
  }

  try {
    await user.save();
  } catch (error) {
    return next(new HttpErr("Failed to add the item to cart"), 500);
  }
  res.status(201).json({ message: "The item is added to the cart" });
};

/***************************************************************************
 ****************************************************************************/

const deleteCartItem = async (req, res, next) => {
  let user;
  try {
    user = User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to delete tthe item from the cart"), 500);
  }
  user.cart.pull(req.body.itemId);

  try {
    await user.save();
  } catch (error) {
    return next(new HttpErr("Failed to delete the item from cart"), 500);
  }
  res.status(201).json({ message: "The item is removed from the cart" });
};

/***************************************************************************
 ****************************************************************************/

const getPurchasedItems = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({ _id: req.user.id });
  } catch (error) {
    return next(new HttpErr("Failed to get the order history"), 500);
  }
  if (!user.purhased) {
    return next(new HttpErr("No items found"), 404);
  }
  res.status(201).json({ items: user.purchased });
};
/***************************************************************************
 ****************************************************************************/

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
  } catch (error) {
    return next(new HttpErr("Failed to delete the user"), 500);
  }
  res.status(201).json({ message: "User deleted" });
};

exports.getUser = getUser;
exports.signUp = signUp;
exports.login = login;
exports.logout = logout;
exports.getWatchlistItems = getWatchlistItems;
exports.addWatchlistItem = addWatchlistItem;
exports.deleteWatchlistItem = deleteWatchlistItem;
exports.getCartItems = getCartItems;
exports.addCartItem = addCartItem;
exports.deleteCartItem = deleteCartItem;
exports.getPurchasedItems = getPurchasedItems;
exports.deleteUser = deleteUser;
