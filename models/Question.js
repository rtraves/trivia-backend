const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    text: String,
    answer: String,
    category: String,
    isValid: Boolean
})

module.exports = mongoose.model('Question', QuestionSchema)