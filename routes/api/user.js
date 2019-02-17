const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validator
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const { User } = require('../../models/user');

// GET all users
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ noUsers: 'There is nothing here' }));
});

// GET user by ID
router.get('/:id', (req, res) => {
    User.findById(id)
        .then(user => req.json(user))
        .catch(err => res.status(404).json({ noUser: 'No user found with that ID' }));
});

// POST/CREATE user
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check for validator
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already in use';
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    })
})

// GET/LOGIN user
router.post('/login', (req, res, ) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = { id: user.id, email: user.email };

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 21600 },
                        (err, token) => {
                            console.log(token)
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                }
            })
        })
})

//GET current user
router.use('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    })
})

module.exports = router;