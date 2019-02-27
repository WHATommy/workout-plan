const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Workout model
const { Workout } = require('../../models/workout');

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

// Retrieve current user's workout folders
router.get('/workoutfolder/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.find({ user: req.user.id })
        .then(userWorkout => res.status(200).json(userWorkout))
        .catch(err => console.log(err))
});

// Retrieve current user's targeted folder workout logs
router.get('/workoutfolder/:workoutfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.findOne({ user: req.user.id })
        .then(workout => {

            workout.workoutFolders.map(folder => {
                if (folder._id == req.params.workoutfolderid) {
                    workout = folder
                }
            });

            res.status(200).json(workout)
        })
        .catch(err => console.log(err))
});

// Create a workout folder
router.post('/workoutfolder/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Workout.findOne({ user: req.user.id })
        .then(workout => {

            const newWorkoutFolder = {
                user: req.user.id,
                workoutFolderName: req.body.workoutFolderName
            };

            workout.workoutFolders.unshift(newWorkoutFolder);

            workout.save()
                .then(workout => res.json(workout))
                .catch(err => console.log(err));
        })
});

// Create a workout log
router.post('/workoutlog/:workoutfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Workout.findOne({ user: req.user.id })
        .then(workout => {

            const newWorkoutFolder = {
                user: req.user.id,
                name: req.body.name,
                weight: req.body.weight,
                reps: req.body.reps
            };

            workout.workoutFolders.map(folder => {
                if (folder._id == req.params.workoutfolderid) {
                    folder.workoutFolderData.unshift(newWorkoutFolder)
                }
            });

            workout.save()
                .then(workout => res.json(workout))
                .catch(err => console.log(err));
        })
});

// Update a workout folder
router.put('/workoutfolder/:workoutfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    Workout.findOne({ user: req.user.id })
        .then(workout => {

            workout.workoutFolders.map(folder => {
                if (folder._id == req.params.workoutfolderid) {
                    folder.workoutFolderName = req.body.workoutFolderName
                }
            });

            workout.save()
                .then(workout => res.status(204).json(workout))
        });
});

// Update a workout log
router.put('/workoutlog/:workoutfolderid/:workoutdataid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateWorkoutInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Workout.findOne({ user: req.user.id })
        .then(workout => {

            const newWorkoutData = {
                user: req.user.id,
                name: req.body.name,
                weight: req.body.weight,
                reps: req.body.reps
            };

            workout.workoutFolders.map(folder => {
                if (folder._id == req.params.workoutfolderid) {
                    folder.workoutFolderData.map(folderData => {
                        if (folderData._id == req.params.workoutdataid) {
                            folderData.name = newWorkoutData.name
                            folderData.weight = newWorkoutData.weight
                            folderData.reps = newWorkoutData.reps
                        }
                    });
                }
            });

            workout.save()
                .then(workout => res.status(204).json(workout))
        });
});

// Remove a workout folder
router.delete('/workoutfolder/:workoutfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.findOne({ user: req.user.id })
        .then(workout => {

            workout.workoutFolders.map(folder => {
                if (folder._id == req.params.workoutfolderid) {
                    folder.remove()
                }
            });

            workout.save()
                .then(workout => res.status(204).json(workout))
        });
});

// Remove a workout log
router.delete('/workoutlog/:workoutfolderid/:workoutdataid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Workout.findOne({ user: req.user.id })
        .then(workout => {

            workout.workoutFolders.map(folder => {
                if (folder._id == req.params.workoutfolderid) {
                    folder.workoutFolderData.map(folderData => {
                        if (folderData._id == req.params.workoutdataid) {
                            folderData.remove()
                        }
                    });
                }
            });

            workout.save()
                .then(workout => res.status(204).json(workout))
        });
});

module.exports = router;