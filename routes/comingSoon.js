const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Adjust the path as necessary

router.get('/', async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const upcomingMovies = await Movie.find({ releaseYear: { $gt: currentYear } });

        res.json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
