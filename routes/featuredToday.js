const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Import your Movie model

// Featured Today
router.get('/featuredToday', async (req, res) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Set the date to tomorrow

        const movies = await Movie.find({
            featuredDate: {
                $gte: currentDate,
                $lt: tomorrowDate
            }
        });

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;