const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    weight: {
        type: Number
    },
    height: {
        feet: {
            type: Number
        },
        inch: {
            type: Number
        }
    },
    weightGoal: {
        type: Number
    },
    currentWeight: [
        {
            weight: {
                type: Number
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)