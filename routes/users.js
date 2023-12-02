const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure this path is correct
const multer = require('multer');
const path = require('path');

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('The user with the given ID was not found.');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = new User({
        // Add fields as per your User model schema
        name: req.body.name,
        // Other fields...
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('The user with the given ID was not found.');

        // Update fields as necessary
        user.name = req.body.name;
        // Other fields...

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('The user with the given ID was not found.');
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload profile picture
router.post('/:id/profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.profilePicture = '/images/' + req.file.filename;
    await user.save();
    res.send({ message: 'Profile picture updated successfully', profilePicture: user.profilePicture });
  } catch (error) {
    res.status(500).send('Error updating profile picture');
  }
});

module.exports = router;
