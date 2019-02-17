const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('users', UserSchema);

module.exports = { User };