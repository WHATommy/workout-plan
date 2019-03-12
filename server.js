const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const user = require('./routes/api/user');
const workout = require('./routes/api/workout');

const app = express();

app.use(function (req, res, next) {
    var allowedOrigins = "http://localhost:3000";
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, UPDATE, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected', db))
    .catch(err => console.log(err));

// Passport config
require('./config/passport')(passport)

// Routers
app.use('/api/user', user);
app.use('/api/workout', workout);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    console.log('production in progress')
    // Set static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));