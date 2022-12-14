const { findById } = require('../models/Warehouse.model');
const Warehouse = require('../models/Warehouse.model');
// populate will automatically lookup the referred documents so long as there's a ref property
const findAllWarehouses = async () => {
    const warehouses = await Warehouse.find();
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
        const warehouse = await Warehouse.findById(id).populate('inventory._id');
        return warehouse;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
}

const removeItemFromWarehouse = async (id, itemId) => {
   try {
    await Warehouse.updateOne({ _id: id }, { $pull: { inventory: { _id: itemId } } });
    const warehouse = await findWarehouseById(id);
    await updateWarehouse(id, warehouse);
   } catch (error) {
        throw { status: 400, msg: error};
   }
}

const createWarehouse = async warehouseToSave => {
    try {
        const warehouse = new Warehouse(warehouseToSave);
        warehouse.currCapacity = warehouseToSave.inventory.reduce((prev, curr) => prev + curr.qty, 0);
        // capacity check
        if (warehouse.currCapacity > warehouse.capacity) throw { status: 400, msg: 'You cannot have more items than the warehouse capacity. Modify your inventory.' };
        await warehouse.save();
        return warehouse;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
};

const updateWarehouse = async (id, warehouseToUpdate) => {
    try {
        warehouseToUpdate.currCapacity = warehouseToUpdate.inventory.reduce((prev, curr) => prev + curr.qty, 0);
        const warehouse = await findWarehouseById(id);
        if (warehouseToUpdate.currCapacity > warehouse.capacity) throw { status: 400, msg: 'You cannot have more items than the warehouse capacity. Modify your inventory.' };
        await Warehouse.findByIdAndUpdate(id, warehouseToUpdate);
    } catch (error) {
        throw { status: 400, msg: error};
    }
};


const deleteWarehouse = async id => await Warehouse.findByIdAndDelete(id);
module.exports = { findAllWarehouses, createWarehouse, findWarehouseById, updateWarehouse, deleteWarehouse,findWarehouseItems,removeItemFromWarehouse };