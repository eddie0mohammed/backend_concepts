

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    passwordResetToken: {
        type: String
    },

    passwordResetExpires: {
        type: Date
    }

});


module.exports = mongoose.model('User', userSchema);