const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: Number,
    name: String,
});

module.exports = mongoose.model('gener', genreSchema);
