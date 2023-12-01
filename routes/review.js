const express = require('express');
const router = express.Router();
const Review = require('../models/review'); // Ensure this path is correct

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user').populate('movie');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get review by ID
router.get('/:id', getReview, (req, res) => {
    res.json(res.review);
});

// Add a new review
router.post('/', async (req, res) => {
    const review = new Review({
        user: req.body.user,
        movie: req.body.movie,
        rating: req.body.rating,
        content: req.body.content,
        dateAdded: req.body.dateAdded || new Date() // Use current date if not provided
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a review
router.patch('/:id', getReview, async (req, res) => {
    // ... existing update logic ...

    try {
        const updatedReview = await res.review.save();
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a review
router.delete('/:id', getReview, async (req, res) => {
    try {
        await res.review.remove();
        res.json({ message: 'Deleted Review' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get review by ID
async function getReview(req, res, next) {
    try {
        review = await Review.findById(req.params.id).populate('user').populate('movie');
        if (review == null) {
            return res.status(404).json({ message: 'Cannot find review' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.review = review;
    next();
}

module.exports = router;
