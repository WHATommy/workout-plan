const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentWeightSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    currentWeight: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = CurrentWeight = mongoose.model('currentweights', CurrentWeightSchema);