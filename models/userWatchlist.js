const mongoose = require('mongoose');

const userWatchlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('UserWatchlist', userWatchlistSchema);
