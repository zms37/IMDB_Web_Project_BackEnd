const express = require('express');
const router = express.Router();
const Director = require('../models/director'); // Adjust the path as needed

// Get all directors
router.get('/', async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one director
router.get('/:id', getDirector, (req, res) => {
    res.json(res.director);
});

// Create a director
router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name,
        biography: req.body.biography,
        dateOfBirth: req.body.dateOfBirth
    });

    try {
        const newDirector = await director.save();
        res.status(201).json(newDirector);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a director
router.patch('/:id', getDirector, async (req, res) => {
    if (req.body.name != null) {
        res.director.name = req.body.name;
    }
    // ... other fields

    try {
        const updatedDirector = await res.director.save();
        res.json(updatedDirector);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a director
router.delete('/:id', getDirector, async (req, res) => {
    try {
        await res.director.remove();
        res.json({ message: 'Deleted Director' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get director by ID
async function getDirector(req, res, next) {
    let director;
    try {
        director = await Director.findById(req.params.id);
        if (director == null) {
            return res.status(404).json({ message: 'Cannot find director' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.director = director;
    next();
}

module.exports = router;
