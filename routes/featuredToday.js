const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); // Adjust the path as necessary

// Middleware to check if the cache should be refreshed
const cacheMiddleware = (req, res, next) => {
    const today = new Date().setHours(0, 0, 0, 0);
    if (!global.featuredCache || global.featuredCache.date !== today) {
        global.featuredCache = { date: today };
        next();
    } else {
        res.json(global.featuredCache.movies);
    }
};

router.get('/', cacheMiddleware, async (req, res) => {
    try {
        if (!global.featuredCache.movies) {
            const movies = await Movie.aggregate([
                { $sample: { size: 10 } }
            ]);
            global.featuredCache.movies = movies;
        }
        res.json(global.featuredCache.movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
