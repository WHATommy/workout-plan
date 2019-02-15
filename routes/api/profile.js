const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/profile');

// Retrieve user profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find({ user: req.user.id })
        .then(profile => res.status(200).json(profile))
        .catch(err => console.log(err))
});

// Create user profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profile = new Profile({
        user: req.user.id,
        feet: req.body.feet,
        inch: req.body.inch,
        goal: req.body.weightGoal,
        currentWeight: [
            {
                weight: req.body.currentWeight.weight
            }
        ]
    });

    profile.save()
        .then(profile => res.status(200).json(profile))
        .catch(err => console.log(err))
});

// Update user profile
router.put('/:profileid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const updatedProfile = {
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

module.exports = router;