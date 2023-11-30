const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    tmdbId: String,
    title: String,
    genres: [String],
    director: Number,
    writer: Number,
    releaseYear: Number,
    posterImage: String,
    trailerUrl: String,
    actor: [Number],
    rating: Number,
    description: [String],
    boxOffice: Number,
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('movie', movieSchema);
