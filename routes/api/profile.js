const express = require('express');
const router = express.Router();
const passport = require('passport');

// Profile model
const Profile = require('../../models/profile');
const CurrentWeight = require('../../models/profile.currentWeight')

// Input validation
const validateProfileInput = require('../../validation/profile');
const validateCurrentWeightInput = require('../../validation/profile.currentWeight');

// Retrieve user profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find({ user: req.user.id })
        .then(profile => res.status(200).json(profile))
        .catch(err => console.log(err))
});

// Create user profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { isValid, errors } = validateProfileInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const profile = new Profile({
        user: req.user.id,
        feet: req.body.feet,
        inch: req.body.inch,
        weightGoal: req.body.weightGoal
    });

    profile.save()
        .then(profile => res.status(200).json(profile))
        .catch(err => console.log(err))
});

// Update user profile
router.put('/:profileid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { isValid, errors } = validateProfileInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const updatedProfile = {
        user: req.user.id,
        feet: req.body.feet,
        inch: req.body.inch,
        goal: req.body.weightGoal,
        currentWeight: [
            {
                weight: req.body.currentWeight.weight
            }
        ]
    };

    Profile.findByIdAndUpdate(req.params.profileid, updatedProfile)
        .then(profile => res.status(204).json(profile))
        .catch(err => console.log(err));
});

// Retrieve user's current weight
router.get('/currentweight', passport.authenticate('jwt', { session: false }), (req, res) => {
    CurrentWeight.find({ user: req.user.id })
        .then(currentWeight => res.status(200).json(currentWeight))
        .catch(err => console.log(err));
});

// Create user's current weight for profile
router.post('/currentweight', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { isValid, errors } = validateCurrentWeightInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const currentWeight = new CurrentWeight({
        user: req.user.id,
        currentWeight: req.body.currentWeight
    });

    currentWeight.save()
        .then(currentWeight => res.status(200).json(currentWeight))
        .catch(err => console.log(err))
});

module.exports = router;