const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genres: [String],
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Writer' },
    releaseYear: Number,
    posterImage: String,
    trailerUrl: String,
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
});

module.exports = mongoose.model('Movie', movieSchema);
