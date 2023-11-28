const express = require('express');
const router = express.Router();
const Actor = require('../models/actor'); // Adjust the path as needed

// Get all actors
router.get('/', async (req, res) => {
    try {
        const actors = await Actor.find();
        res.json(actors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one actor
router.get('/:id', getActor, (req, res) => {
    res.json(res.actor);
});

// Create an actor
router.post('/', async (req, res) => {
    const actor = new Actor({
        name: req.body.name,
        biography: req.body.biography,
        dateOfBirth: req.body.dateOfBirth,
        posterImage: req.body.posterImage
    });

    try {
        const newActor = await actor.save();
        res.status(201).json(newActor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an actor
router.patch('/:id', getActor, async (req, res) => {
    if (req.body.name != null) {
        res.actor.name = req.body.name;
    }
    // ... other fields

    try {
        const updatedActor = await res.actor.save();
        res.json(updatedActor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an actor
router.delete('/:id', getActor, async (req, res) => {
    try {
        await res.actor.remove();
        res.json({ message: 'Deleted Actor' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get actor by ID
async function getActor(req, res, next) {
    let actor;
    try {
        actor = await Actor.findById(req.params.id);
        if (actor == null) {
            return res.status(404).json({ message: 'Cannot find actor' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.actor = actor;
    next();
}

module.exports = router;
