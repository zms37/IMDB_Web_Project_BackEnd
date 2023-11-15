const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
    name: String,
    biography: String,
    dateOfBirth: Date
});

module.exports = mongoose.model('Writer', writerSchema);
