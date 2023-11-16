const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model

// User's Watchlist
router.get('/users/:userId/watchlist', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.json(user.watchlist);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;