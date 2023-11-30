const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Adjust the path as necessary

// Get all box office movies
router.get('/', async (req, res) => {
    try {
        const boxOfficeMovies = await Movie.find({ boxOffice: 1 });
        res.json(boxOfficeMovies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific box office movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id, boxOffice: 1 });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new movie to the box office list
router.post('/', async (req, res) => {
    const movie = new Movie({
        ...req.body,
        boxOffice: 1
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a box office movie by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: req.params.id, boxOffice: 1 },
            req.body,
            { new: 1 }
        );
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a box office movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id, boxOffice: 1 });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
