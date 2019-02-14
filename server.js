const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport');

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const workout = require('./routes/api/workout');

const app = express();

app.use(function (req, res, next) {
    var allowedOrigins = "http://localhost:3000";
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Passport config
require('./config/passport')(passport)

// Routers
//app.use('/api/profile', profile);
app.use('/api/user', user);
app.use('/api/workout', workout);

const port = process.env.PORT || 7070;

app.listen(port, () => console.log(`Server is listening on port ${port}`));