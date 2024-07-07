const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    date: {
        type: Number,
        default: () => moment().startOf('day').unix() * 1000
    },
});


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
