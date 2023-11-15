const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: String,
    biography: String,
    dateOfBirth: Date,
    posterImage: String
});

module.exports = mongoose.model('Actor', actorSchema);
