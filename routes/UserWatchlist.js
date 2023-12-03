const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserWatchlist = require('../models/userWatchlist'); // Adjust the path as needed

// Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get watchlist for a user
router.get('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const watchlist = await UserWatchlist.findOne({ user: req.params.userId }).populate('movies');
        if (!watchlist) {
            return res.status(404).json({ message: 'User watchlist not found' });
        }
        res.json(watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add or update watchlist for a user
router.post('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        let watchlist = await UserWatchlist.findOne({ user: req.params.userId });
        
        if (!watchlist) {
            // Create a new watchlist
            watchlist = new UserWatchlist({ 
                user: req.params.userId, 
                movies: req.body.movieId ? [req.body.movieId] : [] 
            });
        } else {
            // Update the existing watchlist
            if (req.body.movieId) {
                // Here you can decide whether to append the new movieId, replace the array, etc.
                // This example simply adds the new movieId to the array
                watchlist.movies.push(req.body.movieId);
            }
        }

        const updatedWatchlist = await watchlist.save();
        res.status(201).json(updatedWatchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete watchlist for a user
router.delete('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const result = await UserWatchlist.findOneAndDelete({ user: req.params.userId });
        if (!result) {
            return res.status(404).json({ message: 'User watchlist not found' });
        }
        res.json({ message: 'User watchlist deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
