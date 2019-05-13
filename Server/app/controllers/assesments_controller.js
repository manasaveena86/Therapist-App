const express = require('express')
const router = express.Router()
const { Assesment } = require('../models/assesment')
const {authenticateUser}= require('../middleware/authenticate')

//route to get assesment detials
router.get('/', authenticateUser,(req, res) => {
    Assesment.find({user:req.user._id})
    .populate('child')
        .then((assesments) => {
            res.send(assesments)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a assesment 
router.post('/', authenticateUser,(req, res) => {
    const body = req.body
    //console.log(body)
    
    const assesment = new Assesment(body)
    assesment.user=req.user._id
    assesment.save()
        .then((assesment) => {
           // console.log('data',asmt)
            
                res.send(assesment)
             
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a assesment by ID
router.get('/:id', authenticateUser,(req, res) => {
    const id = req.params.id
    Assesment.findById({ _id: id ,user:req.user._id})
    .populate('child')
        .then((assesment) => {
            if (assesment) {
                res.send(assesment)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a assesment 
router.put('/:id', authenticateUser,(req, res) => {
    const body = req.body
    const id = req.params.id
    Assesment.findByIdAndUpdate({ _id: id ,user:req.user._id},{$set:body}, { new: true })
        .then((assesment) => {
            if (assesment) {
                res.send(assesment)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route - to delete a record by Id
router.delete('/:id', authenticateUser,(req, res) => {
    const id = req.params.id
    Assesment.findByIdAndDelete(id,{user:req.user._id})
        .then((assesment) => {
            if (assesment) {
                res.send(assesment)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { assesmentRouter: router }