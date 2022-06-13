const express = require('express');
const router = express.Router();
const Question = require('./models/Question');
router.use(express.json());


// get 12 random trivia questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.aggregate([{$match: {isValid: true}},{ $sample: { size: 12} }]);
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});
// get all questions for admin page
router.get('/admin/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});


// get one trivia question
router.get('/admin/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.findOne({_id}) 
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
});

// create one trivia question
router.post('/questions', async (req, res) => {
    try {
        const { text }  = req.body
        const { answer } = req.body
        const { category } = req.body
        const { isValid } = req.body

        const question = await Question.create({
            text,
            answer,
            category,
            isValid
        })

        return res.status(201).json(question)
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error":error})
    }
})

// update one trivia question
router.put('/admin/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { text, answer, category, isValid } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                text,
                answer,
                category,
                isValid
            })
            return res.status(201).json(question)
        }else{
            question.text = text,
            question.answer = answer,
            question.category = category,
            question.isValid = isValid,
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one trivia question
router.delete('/admin/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router;