const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Import your Movie model

// Recently Added Movies (Top five)
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ addedDate: -1 }).limit(5);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
