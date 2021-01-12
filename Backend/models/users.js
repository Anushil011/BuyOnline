const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, minlength: 8 },
  password: { type: String, required: true },
  isAdmin: Boolean,
  purchased: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  watchlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  cart: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
