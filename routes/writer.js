const express = require('express');
const router = express.Router();
const Writer = require('../models/writer'); // Adjust the path as needed

// Get all writers
router.get('/', async (req, res) => {
    try {
        const writers = await Writer.find();
        res.json(writers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one writer by custom ID
router.get('/:id', getWriter, (req, res) => {
    res.json(res.writer);
});

// Create a new writer
router.post('/', async (req, res) => {
    const writer = new Writer({
        id: req.body.id, // Using custom ID from request body
        name: req.body.name,
        biography: req.body.biography,
        dateOfBirth: req.body.dateOfBirth
    });

    try {
        const newWriter = await writer.save();
        res.status(201).json(newWriter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a writer
router.patch('/:id', getWriter, async (req, res) => {
    if (req.body.name != null) {
        res.writer.name = req.body.name;
    }
    // ... other fields as needed

    try {
        const updatedWriter = await res.writer.save();
        res.json(updatedWriter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a writer
router.delete('/:id', getWriter, async (req, res) => {
    try {
        await res.writer.remove();
        res.json({ message: 'Deleted Writer' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get writer by custom ID
async function getWriter(req, res, next) {
    let writer;
    try {
        writer = await Writer.findOne({ id: req.params.id });
        if (writer == null) {
            return res.status(404).json({ message: 'Cannot find writer' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.writer = writer;
    next();
}

module.exports = router;
