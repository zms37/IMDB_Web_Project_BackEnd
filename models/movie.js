const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    tmdbId: String,
    title: String,
    genres: [String],
    director: Number,
    writer: [Number],
    releaseYear: Number,
    posterImage: String,
    trailerUrl: String,
    actor: [Number],
    rating: Number,
    description: [String],
    boxOffice: Number, 
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('Movie', movieSchema);
