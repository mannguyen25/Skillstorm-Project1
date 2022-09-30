const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    capacity: {
        type: Number,
        required: true,
        default: 100,
        min: [0, 'Must be at least 0, got {VALUE}'],
    },
    currCapacity: {
        type: Number,
        default: 0,
    },
    inventory: {
        type: [{
            type: {
                item: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Item' 
                },
                qty: {
                    type: Number,
                    default: 0
                }
            }
        }],
        validate: [inventoryArray => inventoryArray.reduce((prev, curr) => prev.qty + curr.qty) < 100
        , `Must be less than the capacity of 100`]
    },
  });


// warehouseSchema.virtual('currCapacity').get(function() {
//     return this.inventory.reduce((previousValue, currentValue) => previousValue.qty + currentValue.qty);
// });

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
