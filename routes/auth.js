const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import User model

// POST endpoint for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, gender, dateOfBirth, country, profilePicture } = req.body;
        const newUser = new User({
            username,
            email,
            password: req.body.password,
            gender,
            dateOfBirth,
            country,
            profilePicture
        });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error: error.message });
    }
});

module.exports = router;
