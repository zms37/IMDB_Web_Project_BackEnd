const express = require('express');
const router = express.Router();

// Mock users data
const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    // ... add more users as needed
];

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get a user by id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.json(user);
});

// ... add more routes as needed

module.exports = router;