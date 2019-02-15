const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    feet: {
        type: Number
    },
    inch: {
        type: Number
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