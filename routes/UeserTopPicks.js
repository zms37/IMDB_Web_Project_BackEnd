const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model

// User's Top Picks
router.get('/users/:userId/topPicks', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.json(user.topPicks);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;