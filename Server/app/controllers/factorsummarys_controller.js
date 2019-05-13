const express = require('express')
const router = express.Router()
const { Factorsummary } = require('../models/child')

//route to get factorsummary detials
router.get('/', (req, res) => {
    Factorsummary.find()
        .then((factorsummaryern) => {
            res.send(factorsummaryern)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a factorsummary 
router.post('/', (req, res) => {
    const body = req.body
    const factorsummary = new Factorsummary(body)
    factorsummary.save()
        .then((factorsummary) => {
            if (factorsummary) {
                res.send(factorsummary)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a factorsummary by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Factorsummary.findById({ _id: id })
        .then((factorsummary) => {
            if (factorsummary) {
                res.send(factorsummary)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a factorsummary 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Factorsummary.findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((factorsummary) => {
            if (factorsummary) {
                res.send(factorsummary)
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
    Factorsummary.findByIdAndDelete(id)
        .then((factorsummary) => {
            if (factorsummary) {
                res.send(factorsummary)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { factorsummaryRouter: router }