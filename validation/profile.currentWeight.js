const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCurrentWeightInput(data) {
    let errors = {}

    data.currentWeight = !isEmpty(data.currentWeight) ? data.currentWeight : '';

    if (!validator.isInt(data.currentWeight)) {
        errors.currentWeight.weight = 'Weight goal must be a number';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}