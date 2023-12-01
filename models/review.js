const mongoose = require('mongoose');
require('./user');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    rating: Number,
    content: String,
    dateAdded: { type: Date, default: Date.now } // Default to current date
});

module.exports = mongoose.model('Review', reviewSchema);
