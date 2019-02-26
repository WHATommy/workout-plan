const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutFolderDataSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
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
});

const WorkoutFoldersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    workoutFolderName: {
        type: String,
        required: true
    },
    workoutFolderData: [WorkoutFolderDataSchema]
});

const WorkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    workoutFolders: [WorkoutFoldersSchema]
});

const Workout = mongoose.model('workouts', WorkoutSchema);
const WorkoutFolders = mongoose.model('workoutfolders', WorkoutFoldersSchema);
const WorkoutFolderData = mongoose.model('workoutfolderdata', WorkoutFolderDataSchema);

module.exports = { Workout, WorkoutFolders, WorkoutFolderData }