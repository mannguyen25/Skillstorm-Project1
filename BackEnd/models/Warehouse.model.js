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
                _id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Item',
                    alias: 'item'
                },
                qty: {
                    type: Number,
                    default: 0
                }
            },
        }],
    },
  });

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
