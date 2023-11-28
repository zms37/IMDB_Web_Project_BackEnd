const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    biography: String,
    dateOfBirth: Date,
    posterImage: String
});

module.exports = mongoose.model('Actor', actorSchema);
