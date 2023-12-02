const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false // Set to false or remove this field
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    dateOfBirth: Date,
    country: String,
    profilePicture: String,
    accountCreationDate: {
        type: Date,
        default: Date.now
    }
    // Add other fields as necessary
});

module.exports = mongoose.model('User', userSchema);
