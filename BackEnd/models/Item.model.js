const mongoose = require("mongoose");
const Warehouse = require('../models/Warehouse.model');

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

  
itemSchema.pre('findOneAndDelete', function (next) {
  Warehouse.update(
    { },
    { "$pull": { "qty": this._id } },
    { "multi": true },
    next
);})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
