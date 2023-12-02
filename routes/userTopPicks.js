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

// Add or update top picks for a user
router.post('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        let topPicks = await UserTopPicks.findOne({ user: req.params.userId });
        if (!topPicks) {
            topPicks = new UserTopPicks({ user: req.params.userId, movies: req.body.movies });
        } else {
            topPicks.movies = req.body.movies;
        }
        const updatedTopPicks = await topPicks.save();
        res.status(201).json(updatedTopPicks);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete top picks for a user
router.delete('/:userId', async (req, res) => {
    if (!isValidObjectId(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const result = await UserTopPicks.findOneAndDelete({ user: req.params.userId });
        if (!result) {
            return res.status(404).json({ message: 'User top picks not found' });
        }
        res.json({ message: 'User top picks deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
