const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Import your Movie model

// Coming Soon
router.get('/comingSoon', async (req, res) => {
    try {
        const currentDate = new Date();
        const movies = await Movie.find({ releaseDate: { $gt: currentDate } });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;