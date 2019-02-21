const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWorkoutInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    data.weight = !isEmpty(data.weight) ? data.weight : '';
    data.reps = !isEmpty(data.reps) ? data.reps : '';

    if (validator.isEmpty(data.name)) {
        errors.name = 'Workout name is required';
    }

    if (validator.isEmpty(data.weight)) {
        errors.weight = 'Weight is required';
    }

    if (validator.isEmpty(data.reps)) {
        errors.reps = 'reps is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}