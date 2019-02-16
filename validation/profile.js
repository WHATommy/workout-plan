const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {}

    data.feet = !isEmpty(data.feet) ? data.feet : '';
    data.inch = !isEmpty(data.inch) ? data.inch : '';
    data.weightGoal = !isEmpty(data.weightGoal) ? data.weightGoal : '';

    if (!validator.isInt(data.feet)) {
        errors.feet = 'Feet must be a number';
    }

    if (!validator.isInt(data.inch)) {
        errors.inch = 'Inch must be a number';
    }

    if (!validator.isInt(data.weightGoal)) {
        errors.weightGoal = 'Weight goal must be a number';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}