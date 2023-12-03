const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserTopPicks = require('../models/userTopPicks'); // Adjust the path as needed

// Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get top picks for a user
router.get('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const topPicks = await UserTopPicks.findOne({ user: req.params.userId }).populate('movies');
        if (!topPicks) {
            return res.status(404).json({ message: 'User top picks not found' });
        }
        res.json(topPicks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a movie to top picks for a user
router.post('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId) || !isValidObjectId(req.body.movieId)) {
        return res.status(400).json({ message: 'Invalid user ID or movie ID' });
    }

    try {
        let topPicks = await UserTopPicks.findOne({ user: req.params.userId });
        if (!topPicks) {
            topPicks = new UserTopPicks({ user: req.params.userId, movies: [req.body.movieId] });
        } else {
            // Add movie to the list if it's not already there
            if (!topPicks.movies.includes(req.body.movieId)) {
                topPicks.movies.push(req.body.movieId);
            }
        }
        const updatedTopPicks = await topPicks.save();
        res.status(201).json(updatedTopPicks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove a movie from top picks for a user
router.delete('/:userId/:movieId', async (req, res) => {
    if (!isValidObjectId(req.params.userId) || !isValidObjectId(req.params.movieId)) {
        return res.status(400).json({ message: 'Invalid user ID or movie ID' });
    }

    try {
        const topPicks = await UserTopPicks.findOne({ user: req.params.userId });
        if (!topPicks) {
            return res.status(404).json({ message: 'User top picks not found' });
        }

        topPicks.movies = topPicks.movies.filter(movieId => movieId.toString() !== req.params.movieId);
        await topPicks.save();
        res.json({ message: 'Movie removed from top picks' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
