const express = require('express')
const router = express.Router()
const { Discipline } = require('../models/discipline')

//route to get discipline detials
router.get('/', (req, res) => {
    Discipline.find()
        .then((disciplines) => {
            res.send(disciplines)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a discipline 
router.post('/', (req, res) => {
    const body = req.body
    const discipline = new Discipline(body)
    discipline.save()
        .then((discipline) => {
            if (discipline) {
                res.send(discipline)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a discipline by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Discipline.findById({ _id: id })
        .then((discipline) => {
            if (discipline) {
                res.send(discipline)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a discipline 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Discipline.findByIdAndUpdate({ _id: id }, {$set:body}, { new: true })
        .then((discipline) => {
            if (discipline) {
                res.send(discipline)
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
    Discipline.findByIdAndDelete(id)
        .then((discipline) => {
            if (discipline) {
                res.send(discipline)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { disciplineRouter: router }