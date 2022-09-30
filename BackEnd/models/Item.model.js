const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    UPC: {
      type: Number,
      required: true,
    },
    component: String,
    cost: Number,
    brand: String,
    imgUrl: String
  });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
