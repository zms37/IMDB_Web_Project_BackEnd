const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model
const Movie = require('../models/Movie'); // Import your Movie model

// Add to Watchlist
router.post('/users/:userId/UserWatchlist', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const movie = await Movie.findById(req.body.movieId);
        if (user && movie) {
            user.watchlist.push(movie);
            await user.save();
            res.status(201).json(user.watchlist);
        } else {
            res.status(404).json({ message: 'User or movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;