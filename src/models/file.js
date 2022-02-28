const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    md5: String,
    backups: [{
        id: {
            type: String,
            required: true
        },
        md5: {
            type: String
        },
        type: {
            type: String,
            enum: ['txt', 'mp4'],
            required: true
        }
    }],
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
},
    {
        timestamps: true
    });

module.exports = mongoose.model('file', fileSchema)