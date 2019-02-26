const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWorkoutFolderInput(data) {
    let errors = {}

    data.workoutFolderName = !isEmpty(data.workoutFolderName) ? data.workoutFolderName : '';

    if (validator.isEmpty(data.workoutFolderName)) {
        errors.workoutFolderName = 'Name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}