const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Workout model
const { Workout, WorkoutFolders, WorkoutFolderData } = require('../../models/workout');

// Input validation
const validateWorkoutInput = require('../../validation/workout');
const validateWorkoutFolderInput = require('../../validation/workoutFolder');

// Retrieve ALL workout logs
router.get('/', (req, res) => {
    Workout.find()
        .sort({ date: -1 })
        .then(workout => res.json(workout))
        .catch(err => res.status(404).json({ noWorkouts: 'it is empty here' }));
});

// Retrieve current user's workout logs
router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.find({ user: req.user.id })
        .then(userWorkout => res.status(200).json(userWorkout))
        .catch(err => console.log(err))
})

// Create a workout folders
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Workout.findOne({ user: req.user.id })
        .then(workoutData => {
            const newWorkoutFolder = {
                user: req.user.id,
                workoutFolderName: req.body.workoutFolderName
            };
            console.log(workoutData.workoutFolders)
            workoutData.workoutFolders.unshift(newWorkoutFolder);

            workoutData.save()
                .then(workout => res.json(workout))
                .catch(err => console.log(err));
        })
});


// TODOS

// Update a workout folder
router.put('/:workoutfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    Workout.findOne({ user: req.user.id })
        .then(workout => {

            workout.workoutFolders.map(folders => {
                if (folders._id == req.params.workoutfolderid) {
                    folders.workoutFolderName = req.body.workoutFolderName
                }
            });

            workout.save()
                .then(workout => res.status(204).json(workout))
        });
});

// Remove a workout folder
router.delete('/:workoutid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.findOne({ user: req.user.id })
        .then(workout => {

            workout.workoutFolders.map(folders => {
                if (folders._id == req.params.workoutid) {
                    folders.remove()
                }
            });

            workout.save()
                .then(workout => res.status(204).json(workout))
        });
});

module.exports = router;