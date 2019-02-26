const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Workout model
const Workout = require('../../models/workout');

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

    Workout.find({ user: req.user.id })
        .then(workoutData => {
            const newWorkoutFolder = {
                workoutFolderName: req.body.workoutFolderName
            };

            workoutData[0].workoutFolders.unshift(newWorkoutFolder);

            workoutData[0].save()
                .then(workout => res.json(workout))
                .catch(err => console.log(err));
        })
});

// Update a workout folder
router.put('/:workoutfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    Workout.find({ user: req.user.id })
        .then(workoutData => {
            console.log(workoutData[0].workoutFolderName)
            const workoutFolderUpdate = {
                workoutFolderName: req.body.workoutFolderName
            };

            Workout.findByIdAndUpdate(req.params.workoutfolderid, workoutFolderUpdate)
                .then(workoutData => res.status(204).json(workoutData))
                .catch(err => console.log(err));
        })

});

// Remove a workout folder
router.delete('/:workoutid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.findByIdAndDelete(req.params.workoutid)
        .then(res.status(204).end())
        .catch(err => console.log(err));
});

module.exports = router;