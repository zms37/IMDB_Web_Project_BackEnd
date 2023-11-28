const express = require('express');
const router = express.Router();
const UserWatchlist = require('../models/userWatchlist'); // Adjust the path as needed

// Get watchlist for a user
router.get('/:userId', async (req, res) => {
    try {
        const watchlist = await UserWatchlist.findOne({ user: req.params.userId }).populate('movies');
        res.json(watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add or update watchlist for a user
router.post('/:userId', async (req, res) => {
    try {
        let watchlist = await UserWatchlist.findOne({ user: req.params.userId });
        if (!watchlist) {
            // Create new watchlist if it doesn't exist
            watchlist = new UserWatchlist({ user: req.params.userId, movies: req.body.movies });
        } else {
            // Update existing watchlist
            watchlist.movies = req.body.movies;
        }
        const updatedWatchlist = await watchlist.save();
        res.status(201).json(updatedWatchlist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete watchlist for a user
router.delete('/:userId', async (req, res) => {
    try {
        const result = await UserWatchlist.findOneAndDelete({ user: req.params.userId });
        if (result) {
            res.json({ message: 'User watchlist deleted' });
        } else {
            res.status(404).json({ message: 'User watchlist not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
