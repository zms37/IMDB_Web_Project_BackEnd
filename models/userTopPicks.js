const mongoose = require('mongoose');

const userTopPicksSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('UserTopPicks', userTopPicksSchema);
