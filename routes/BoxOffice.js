const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Import your Movie model

// Box Office
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ boxOffice: -1 }).limit(10);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;