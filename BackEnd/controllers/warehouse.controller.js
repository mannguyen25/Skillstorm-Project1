const Warehouse = require('../models/Warehouse.model');
// populate will automatically lookup the referred documents so long as there's a ref property
const findAllWarehouses = async () => {
    const warehouses = await Warehouse.find().select('capacity currCapacity');
    return warehouses;
};

const findWarehouseById = async id => {
    try {
        const warehouse = await Warehouse.findById(id);
        if (warehouse == null) {
            throw {status: 204, msg: `No warehouse with the id ${id} was found.`};
        }
        return warehouse;
    } catch (error) {
        throw error;
    }
};

const findWarehouseItems = async id => {
    try {
        return await findWarehouseById(id).populate('inventory.item').inventory;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
}
const createWarehouse = async warehouseToSave => {
    try {
        const warehouse = new Warehouse(warehouseToSave);
        warehouse.currCapacity = warehouse.inventory.reduce((previousValue, currentValue) => previousValue.qty + currentValue.qty);
        await warehouse.save();
        return warehouse;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
};

const updateWarehouse = async (id, warehouseToUpdate) => {
    try {
        await Warehouse.findByIdAndUpdate(id, warehouseToUpdate);
    } catch (error) {
        throw { status: 400, msg: error};
    }
};


const deleteWarehouse = async id => {
    try {
        await Warehouse.findByIdAndDelete(id);
    } catch (error) {
        throw { status: 400, msg: error};
    }
}
module.exports = { findAllWarehouses, createWarehouse, findWarehouseById, updateWarehouse, deleteWarehouse,findWarehouseItems };