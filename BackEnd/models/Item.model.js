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
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    component: String,
    cost: Number,
    brand: String,
    imgUrl: String
  });


itemSchema.pre('findOneAndDelete', async function (next) {
  const id = this.getQuery()._id;
  await Warehouse.updateMany({}, { $pull: { inventory: { item: id} } });
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
