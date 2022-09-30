const Item = require('../models/Item.model');

// populate will automatically lookup the referred documents so long as there's a ref property
const findAllItems = async () => await Item.find();

const findItemById = async id => {
    try {
        const item = await Item.findById(id);
        if (item == null) {
            throw {status: 204, msg: `No item with the upc ${upc} was found.`};
        }
        return item;
    } catch (error) {
        throw error;
    }
};

const findItemByUPC = async upc => {
    try {
        const item = await Item.findOne({UPC: upc});
        if (item == null) {
            throw {status: 204, msg: `No item with the upc ${upc} was found.`};
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

const updateItemByUPC = async (upc, itemToUpdate) => {
    try {
        await Item.findOneAndUpdate({UPC: upc}, itemToUpdate);
    } catch (error) {
        throw { status: 400, msg: error};
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
    try {
        await Item.findByIdAndDelete(id);
    } catch (error) {
        throw { status: 400, msg: error};
    }
}

const deleteItemByUPC = async upc => {
    try {
        await Item.findOneAndDelete({UPC: upc});
    } catch (error) {
        throw { status: 400, msg: error};
    }
};
module.exports = { findAllItems, createItem, findItemByUPC, findItemById, updateItemByUPC, updateItem, deleteItemByUPC, deleteItem };