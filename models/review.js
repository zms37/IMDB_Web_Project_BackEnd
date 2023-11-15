const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    rating: Number,
    title: String,
    content: String,
    dateAdded: Date
});

module.exports = mongoose.model('Review', reviewSchema);
