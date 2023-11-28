const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Import your Movie model

// Mock movies data
let movies = [
    { id: 1, title: 'Movie 1', director: 'Director 1', year: 2000 },
    { id: 2, title: 'Movie 2', director: 'Director 2', year: 2001 },
    // ... add more movies as needed
];

  router.get('/', async (req, res) => {
    try {
        // Code to filter the mock data based on some criteria, e.g., featuredDate
        // Since your mock data doesn't include a 'featuredDate' field, this part needs to be adapted
        const featuredMovies = movies;

        res.json(featuredMovies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;