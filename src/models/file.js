const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
        unique: true
    },
    dest: {
        type: String,
    },
    backup: {
        type: String,
    },
    parent: {
        type: String,
    },
    live: {
        type: Boolean,
        default: true
    },
    error: {
        type: Boolean,
        default: false
    },
    error_message: {
        type: String
    }
});

module.exports = mongoose.model('file', fileSchema)