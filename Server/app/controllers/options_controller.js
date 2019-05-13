const express = require('express')
const router = express.Router()
const { Option } = require('../models/option')

//route to get option detials
router.get('/', (req, res) => {
    Option.find()
        .then((options) => {
            res.send(options)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a option 
router.post('/', (req, res) => {
    const body = req.body
    //console.log(body)
    const option = new Option(body)
    option.save()
        .then((option) => {
            if (option) {
                res.send(option)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a option 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Option.findByIdAndUpdate({ _id: id }, {$set:body}, { new: true })
        .then((option) => {
            if (option) {
                res.send(option)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a option by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Option.findById({ _id: id })
        .then((option) => {
            if (option) {
                res.send(option)
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
    Option.findByIdAndDelete(id)
        .then((option) => {
            if (option) {
                res.send(option)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { optionRouter: router }