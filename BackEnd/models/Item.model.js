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


// If we remove an item from our overall inventory, they will be removed from the warehouses
// Using the pre hook method of mongoose
itemSchema.pre('findOneAndDelete', async function (next) {
  const id = this.getQuery()._id;
  await Warehouse.updateMany({'inventory.item': id}, { $pull: { inventory: { item: id } } }, next);
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
