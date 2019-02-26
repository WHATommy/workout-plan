const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    workoutFolders: [
        {
            workoutFolderName: {
                type: String,
                required: true
            },
            workoutFolderData: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    weight: {
                        type: Number
                    },
                    reps: {
                        type: Number
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    ]
})

module.exports = Workout = mongoose.model('workouts', WorkoutSchema);