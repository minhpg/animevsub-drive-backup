const mongoose = require('mongoose');

const sharedDriveSchema = new mongoose.Schema({
    id : {
        type: String,
        unique: true,
        required: true
    },
    file_count : {
        type: Number,
        default: 0
    },
    disabled: {
        type: Boolean,
        default: false
    },
    error: {
        type: Boolean,
        default: false,
    }, 
    error_message: {
        type: String,
    }

});
module.exports = mongoose.model('shared-drives', sharedDriveSchema)