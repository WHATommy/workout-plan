const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWorkoutInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    data.weight = !isEmpty(data.weight) ? data.weight : '';
    data.rep = !isEmpty(data.rep) ? data.rep : '';

    if (!validator.isEmpty(data.name)) {
        errors.name = 'Workout name is required';
    }

    if (!validator.isEmpty(data.weight)) {
        errors.weight = 'Weight is required';
    }

    if (!validator.isEmpty(data.rep)) {
        errors.rep = 'Rep is required';
    }

    if (!validator.isInt(data.weight)) {
        errors.weight = 'Weight must be a number';
    }

    if (!validator.isInt(data.weight)) {
        errors.weight = 'Reps must be a number';
    }
}