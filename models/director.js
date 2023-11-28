const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    biography: String,
    dateOfBirth: Date
});

module.exports = mongoose.model('Director', directorSchema);
