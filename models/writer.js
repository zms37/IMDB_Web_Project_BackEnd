const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
    id:Number,
    name: String,
    biography: String,
    dateOfBirth: Date,
    posterImage: String
});

module.exports = mongoose.model('Writer', writerSchema);
