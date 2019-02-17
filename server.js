const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport');

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const workout = require('./routes/api/workout');

const { mongoURI, mongoURI_Test } = require('./config/keys_dev');

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
app.use('/api/profile', profile);
app.use('/api/user', user);
app.use('/api/workout', workout);

// Server port
const PORT = process.env.PORT || 5050;

// React build
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Start express server
let server;

// Start server
function startServer(testEnv) {
    return new Promise((resolve, reject) => {
        let mongoUrl;

        if (testEnv) {
            //If testing env is being used, use the Test URL
            mongoUrl = mongoURI_Test;
        } else {
            //If not useing the testing env, use the live DB URL
            mongoUrl = mongoURI;
        }
        //Connect to the database
        mongoose.connect(mongoUrl, { useNewUrlParser: true }, err => {
            if (err) {
                //If server cannot connect to database, reject the promise and log the error
                console.error(err);
                return reject(err);
            } else {
                //If connection is successful, log the port the server is listening to and resolve the promise
                server = app.listen(PORT, () => {
                    console.log(`Express server listening on http://localhost:${PORT}`);
                    resolve();
                }).on('error', err => {
                    //If server cannot connect to database, reject the promise and log the error
                    mongoose.disconnect();
                    console.error(err);
                    reject(err);
                });
            }
        });
    });
}

// Stop server
function stopServer() {
    return mongoose
        .disconnect()
        .then(() => new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    //If server cannot disconnect from database, reject the promise and log the error
                    console.error(err);
                    return reject(err);
                } else {
                    //If server disconnect from database, resolve the promise and log the success
                    console.log('Express server stopped.');
                    resolve();
                }
            });
        }));
}

module.exports = { app, startServer, stopServer };