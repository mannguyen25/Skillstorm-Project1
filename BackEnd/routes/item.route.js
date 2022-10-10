const router = require('express').Router();
const mongoose = require('mongoose');
const { findAllItems, createItem, findItemById, updateItem, deleteItem } = require('../controllers/item.controller');


// Find all Items
router.get('/', async (req, res) => {
    try {
        const items = await findAllItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find a specific item
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


// delete an item by id
router.delete('/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.send();
});

module.exports = router;