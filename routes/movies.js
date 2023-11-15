const express = require('express');
const router = express.Router();

// Mock movies data
const movies = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    // ... add more movies as needed
];

// Get all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// Get a movie by id
router.get('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.json(movie);
});

// ... add more routes as needed

module.exports = router;