const mongoose = require('mongoose');

const ExeciseSchema = new mongoose.Schema({
    name: String,
    description: String,
    muscles_worked: {},
    difficulty: String
});module.exports = mongoose.model('Execise', ExeciseSchema);