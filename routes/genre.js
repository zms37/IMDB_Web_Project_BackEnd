const express = require('express');
const router = express.Router();
const Genre = require('../models/genre'); // Adjust the path as needed

// Get all genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single genre by custom ID
router.get('/:id', getGenre, (req, res) => {
    res.json(res.genre);
});

// Create a new genre
router.post('/', async (req, res) => {
    const genre = new Genre({
        id: req.body.id, // Using custom ID from request body
        name: req.body.name
    });

    try {
        const newGenre = await genre.save();
        res.status(201).json(newGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a genre
router.patch('/:id', getGenre, async (req, res) => {
    if (req.body.name != null) {
        res.genre.name = req.body.name;
    }
    // ... other fields as needed

    try {
        const updatedGenre = await res.genre.save();
        res.json(updatedGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a genre
router.delete('/:id', getGenre, async (req, res) => {
    try {
        await res.genre.remove();
        res.json({ message: 'Deleted Genre' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get genre by custom ID
async function getGenre(req, res, next) {
    let genre;
    try {
        genre = await Genre.findOne({ id: req.params.id });
        if (genre == null) {
            return res.status(404).json({ message: 'Cannot find genre' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.genre = genre;
    next();
}

module.exports = router;
