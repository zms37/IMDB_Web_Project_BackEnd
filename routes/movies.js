const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Adjust the path as needed

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one movie
router.get('/:id', getMovie, (req, res) => {
    res.json(res.movie);
});

// Create a movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        tmdbId: req.body.tmdbId,
        title: req.body.title,
        genres: req.body.genres,
        director: req.body.director,
        writer: req.body.writer,
        releaseYear: req.body.releaseYear,
        posterImage: req.body.posterImage,
        trailerUrl: req.body.trailerUrl,
        actor: req.body.actor,
        rating: req.body.rating,
        description: req.body.description
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a movie
router.patch('/:id', getMovie, async (req, res) => {
    // Update logic goes here
    // Check for each field if it's not null and update accordingly
    // Example:
    if (req.body.title != null) {
        res.movie.title = req.body.title;
    }
    // ... other fields

    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a movie
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: 'Deleted Movie' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get movie by ID
async function getMovie(req, res, next) {
    let movie;
    try {
        movie = await Movie.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json({ message: 'Cannot find movie' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.movie = movie;
    next();
}

module.exports = router;
