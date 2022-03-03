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

fileSchema.statics.random = async () => {
    const count = await this.count();
    const rand = Math.floor(Math.random() * count);
    const randomDoc = await this.findOne({
        count: { $lt: process.env.SHAREDDRIVE_FILE_LIMIT || 300000 },
        disabled: false,
        error: false
    }).skip(rand);
    return randomDoc;
};

module.exports = mongoose.model('file', fileSchema)