const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: String,
    biography: String,
    dateOfBirth: Date
});

module.exports = mongoose.model('Director', directorSchema);
