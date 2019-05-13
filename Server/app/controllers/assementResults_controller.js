const express = require('express')
const router = express.Router()
const { AssesmentResult } = require('../models/assesmentresults')
const {authenticateUser} =require('../middleware/authenticate')

//route to get assesmentResult detials
router.get('/', authenticateUser,(req, res) => {
    AssesmentResult.find({user:req.user._id})
    .populate('assesment')
    .populate('results.questions.question')
    .populate('results.questions.option')
    .populate('results.subcategory')
    .then((assesmentResult) => {
            res.send(assesmentResult)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a assesmentResult 
router.post('/', authenticateUser,(req, res) => {
    const body = req.body
    const assesmentResult = new AssesmentResult(body)
    assesmentResult.user=req.user._id
    assesmentResult.save()
        .then((assesmentResult) => {
            if (assesmentResult) {
                res.send(assesmentResult)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a assesmentResult by ID
router.get('/:id', authenticateUser,(req, res) => {
    const id = req.params.id
    console.log(id)
    AssesmentResult.findOne({ assesment: id ,user:req.user._id})
        
        .populate('results.questions.question')
        .populate('results.questions.option')
        .populate('results.subcategory')
        .populate('assesment')
        .then((assesmentResult) => {
            if (assesmentResult) {
               // console.log(assesmentResult)
                res.send(assesmentResult)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a assesmentResult 
router.put('/:id', authenticateUser,(req, res) => {
    const body = req.body
    const id = req.params.id
    console.log('sc',body.subcategory, 'q', body.question, 'o', body.option)
    AssesmentResult.findOne({ assesment: id ,user:req.user._id})
        .then(assessmentResult => {
            // 
            //
            // subCategoryQuestion.option = body.option 
            const resultSubCategory = assessmentResult.results.find(result => result.subcategory == body.subcategory)
            if(body.rawScore){
                resultSubCategory.rawScore=body.rawScore
            }
            else{
            const question = resultSubCategory.questions.find(question => question.question == body.question)
            question.option = body.option 
            }
            assessmentResult.save()
                .then((result) => {
                    res.send({
                        result,
                        notice: 'success'
                    })
                })
        })
    // AssesmentResult.findOneAndUpdate({ assesment: id }, body, { new: true })
    //     .then((assesmentResult) => {
    //         if (assesmentResult) {
    //             res.send(assesmentResult)
    //         } else {
    //             res.send({})
    //         }
    //     })
    //     .catch((err) => {
    //         res.send(err)
    //     })
})

//route - to delete a record by Id
router.delete('/:id', authenticateUser,(req, res) => {
    const id = req.params.id
    AssesmentResult.findByIdAndDelete(id,{user:req.user._id})
        .then((assesmentResult) => {
            if (assesmentResult) {
                res.send(assesmentResult)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { assesmentResultRouter: router }