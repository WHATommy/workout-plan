const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String
    },
    weight: {
        type: Number
    },
    rep: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Workout = mongoose.model('workouts', WorkoutSchema);