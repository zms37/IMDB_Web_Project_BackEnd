const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Import your Movie model

// Coming Soon
router.get('/', async (req, res) => {
    try {
        const currentDate = new Date();
        const movies = await Movie.find({ releaseDate: { $gt: currentDate } });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;