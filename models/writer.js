const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
    id:Number,
    name: String,
    biography: String,
    dateOfBirth: Date
});

module.exports = mongoose.model('Writer', writerSchema);
