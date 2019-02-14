const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWorkoutInput(data) {
    let errors = {}

    data.weight = !isEmpty(data.weight) ? data.weight : '';
    data.height.feet = !isEmpty(data.height.feet) ? data.height.feet : '';
    data.height.inch = !isEmpty(data.height.inch) ? data.height.inch : '';
    data.weightGoal = !isEmpty(data.weightGoal) ? data.weightGoal : '';
    data.currentWeight.weight = !isEmpty(data.currentWeight.weight) ? data.currentWeight.weight : '';

    if (!validator.isInt(data.weight)) {
        errors.weight = 'Weight must be a number';
    }

    if (!validator.isInt(data.height.feet)) {
        errors.height.feet = 'Feet must be a number';
    }

    if (!validator.isInt(data.height.inch)) {
        errors.height.inch = 'Inch must be a number';
    }

    if (!validator.isInt(data.weightGoal)) {
        errors.weightGoal = 'Weight goal must be a number';
    }

    if (!validator.isInt(data.currentWeight.weight)) {
        errors.currentWeight.weight = 'Current weight must be a number';
    }


}