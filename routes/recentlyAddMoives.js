const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Adjust the path as necessary


// Get recently added movies
router.get('/', async (req, res) => {
    try {
        // Assuming you want to limit the results, for example, to the 10 most recent movies
        const recentMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
        res.json(recentMovies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
