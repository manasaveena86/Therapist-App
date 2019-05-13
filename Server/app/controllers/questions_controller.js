const express = require('express')
const router = express.Router()
const { Question } = require('../models/question')

//route to get question detials
router.get('/', (req, res) => {
    Question.find()
    .populate('subCategory')
        .then((questions) => {
            res.send(questions)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get('/subcategory/:id',(req,res)=>{
    const id=req.params.id
    Question.find({subCategory:id})
    .then((questions)=>{
        res.send(questions)
    })
    .catch((err)=>{
        res.send(err)
    })

})
//route to add a question 
router.post('/', (req, res) => {
    const body = req.body
    const question = new Question(body)
    question.save()
        .then((question) => {
            if (question) {
                res.send(question)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a question 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Question.findByIdAndUpdate({ _id: id }, {$set:body}, { new: true })
        .then((question) => {
            if (question) {
                res.send(question)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a question by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Question.findById({ _id: id })
    .populate('subCategory')
    .populate('options.option')
        .then((question) => {
            if (question) {
                res.send(question)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to delete a record by Id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Question.findByIdAndDelete(id)
        .then((question) => {
            if (question) {
                res.send(question)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { questionRouter: router }