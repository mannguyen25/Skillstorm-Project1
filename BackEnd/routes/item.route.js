const router = require('express').Router();
const mongoose = require('mongoose');
const { findAllItems, createItem, findItemByUPC, findItemById, updateItemByUPC, updateItem, deleteItemByUPC, deleteItem } = require('../controllers/item.controller');


// Find all Items
router.get('/', async (req, res) => {
    try {
        const items = await findAllItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/upc/:upc', async (req, res) => {
    try {
        const item = await findItemByUPC(req.params.upc);
        res.json(item);
    } catch (err) {
        // Rejected Promise AKA no Pokemon found
        console.log(err);
        res.status(err?.status).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await findItemById(req.params.id);
        res.json(item);
    } catch (err) {
        // Rejected Promise AKA no Pokemon found
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// create an item
router.post('/', async (req, res) => {
    try {
        const item = await createItem(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// Update item by id
router.put('/:id', async (req, res) => {
    try {
        const item = await updateItem(req.params.id, req.body);
        res.status(204).json(item);
    } catch (err) {
        // Rejected Promise AKA no Pokemon found
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// Update item by upc
router.put('/upc/:upc', async (req, res) => {
    try {
        const item = await updateItemByUPC(req.params.upc, req.body);
        res.status(204).json(item);
    } catch (err) {
        // Rejected Promise AKA no Pokemon found
        console.log(err);
        res.status(err?.status).json(err);
    }
});

// delete an item by id
router.delete('/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.send();
});

// delete an item by UPC
router.delete('/upc/:upc', async (req, res) => {
        await deleteItemByUPC(req.params.upc);
        res.send()
});
module.exports = router;