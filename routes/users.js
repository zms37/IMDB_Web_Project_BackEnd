const express = require('express');
const router = express.Router();

// Mock users data
let users = [
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

// Create a new user
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    user.name = req.body.name;
    res.json(user);
});

// Delete a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('The user with the given ID was not found.');
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

module.exports = router;