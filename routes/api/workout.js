const express = require('express');
const router = express.Router();
const passport = require('passport');

// Workout model
const Workout = require('../../models/workout');

// Input validation
const validateWorkoutInput = require('../../validation/workout');

// Retrieve ALL workout logs
router.get('/', (req, res) => {
    Workout.find()
        .then()
        .then(workout => res.json(workout))
        .catch(err => res.status(404).json({ noWorkouts: 'it is empty here' }));
});

// Retrieve current user's workout logs
router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.find({ user: req.user.id })
        .then(userWorkout => res.status(200).json(userWorkout))
        .catch(err => console.log(err))
})

// Create a workout log
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const workout = new Workout({
        user: req.user.id,
        name: req.body.name,
        weight: req.body.weight,
        reps: req.body.reps
    });

    workout.save()
        .then(workout => res.json(workout))
        .catch(err => console.log(err));
});

// Update a workout log
router.put('/:workoutid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const workoutUpdate = {
        user: req.user.id,
        name: req.body.name,
        weight: req.body.weight,
        reps: req.body.reps
    };

    Workout.findByIdAndUpdate(req.params.workoutid, workoutUpdate)
        .then(workout => res.status(204).json(workout))
        .catch(err => console.log(err));
});

// Remove a workout log
router.delete('/:workoutid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.findByIdAndDelete(req.params.workoutid)
        .then(res.status(204).end())
        .catch(err => console.log(err));
});

module.exports = router;