const router = require('express').Router();
const { findAllWarehouses, createWarehouse, findWarehouseById, 
        updateWarehouse, deleteWarehouse, findWarehouseItems,
        removeItemFromWarehouse } = require('../controllers/warehouse.controller');


// Find all Warehouses
router.get('/', async (req, res) => {
    try {
        const warehouses = await findAllWarehouses();
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Find warehouse by id
router.get('/:id', async (req, res) => {
    try {
        const warehouse = await findWarehouseById(req.params.id);
        res.json(warehouse);
    } catch (err) {
        // Rejected Promise AKA no Pokemon found
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// find all items in the warehouse
router.get('/:warehouse_id/inventory', async (req, res) => {
    try {
        const warehouse = await findWarehouseItems(req.params.warehouse_id);
        res.json(warehouse);
    } catch (err) {
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// create an warehouse
router.post('/', async (req, res) => {
    try {
        const warehouse = await createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


// Update warehouse
router.put('/:id', async (req, res) => {
    try {
        const warehouse = await updateWarehouse(req.params.id, req.body);
        res.status(200).json(warehouse);
    } catch (err) {
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// Remove item from warehouse
router.delete('/:id/inventory/:itemId', async (req, res) => {
    try {
        const warehouse = await removeItemFromWarehouse(req.params.id, req.params.itemId);
        res.status(200).json(warehouse);
    } catch (err) {
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// delete a warehouse
router.delete('/:id', async (req, res) => {
    try {
        await deleteWarehouse(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});
module.exports = router;