

const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({

    imageUrl: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Photo', photoSchema);