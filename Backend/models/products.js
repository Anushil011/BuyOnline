const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0.1 },
  quantity: { type: Number, required: true, min: 1 },
  description: { type: String },
  imageURL: { type: String },
  category: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
