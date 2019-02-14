const express = require('express');
const router = express.Router();
const passport = require('passport');

const Workout = require('../../models/workout');

// Retrieve ALL workout logs
router.get('/', (req, res) => {
    Workout.find()
        .then()
        .then(workout => res.json(workout))
        .catch(err => res.status(404).json({ noWorkouts: 'it is empty here' }));
})

// Create a workout log
router.post('/', passport.authenticate('jwt', { session: false })(req, res) => {
    const workout = new Workout({
        name: req.body.name,
        weight: req.body.weight,
        rep: req.body.rep
    });

    workout.save()
        .then(workout => res.json(workout))
        .catch(err => console.log(err));
});

// Update a workout log
router.put('/:workoutid', (req, res) => {
    const workoutUpdate = {
        name: req.body.name,
        weight: req.body.weight,
        rep: req.body.rep
    };

    Workout.findByIdAndUpdate(req.params.workoutid, workoutUpdate)
        .then(workout => res.status(204).json(workout))
        .catch(err => console.log(err));
});

// Remove a workout log
router.delete('/:workoutid', (req, res) => {
    Workout.findByIdAndDelete(req.params.workoutid)
        .then(res.status(204).end())
        .catch(err => console.log(err));
});

module.exports = router