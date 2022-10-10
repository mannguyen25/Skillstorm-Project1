const Item = require('../models/Item.model');
const Warehouse = require('../models/Warehouse.model')

const findAllItems = async () => await Item.find();

const findItemById = async id => {
    try {
        const item = await Item.findById(id);
        if (item == null) {
            throw {status: 204, msg: `No item with the upc ${id} was found.`};
        }
        return item;
    } catch (error) {
        throw error;
    }
};

const createItem = async itemToSave => {
    try {
        const item = new Item(itemToSave);
        await item.save();
        return item;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
};


const updateItem = async (id, itemToUpdate) => {
    try {
        await Item.findByIdAndUpdate(id, itemToUpdate);
    } catch (error) {
        throw { status: 400, msg: error};
    }
};

const deleteItem = async id => {
    const warehouseList = await Warehouse.find({'inventory._id': id});
    await Item.findByIdAndDelete(id)
    for (const warehouse of warehouseList) {
        const warehouseToUpdate = await Warehouse.findById(warehouse._id);
        warehouseToUpdate.currCapacity = warehouseToUpdate.inventory.reduce((prev, curr) => prev + curr.qty, 0);
        await Warehouse.findByIdAndUpdate(warehouseToUpdate._id, warehouseToUpdate);
    }
};

const deleteItemByUPC = async upc => await Item.findOneAndDelete({UPC: upc});
module.exports = { findAllItems, createItem, findItemById, updateItem, deleteItem };