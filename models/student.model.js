const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    first: String,
    last: String,
    hoursWorked: Number,
    points: Number
});

module.exports = mongoose.model('student', StudentSchema, 'student'); //name of model, name of schema, name of collection