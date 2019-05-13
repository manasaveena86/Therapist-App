const express = require('express')
const router = express.Router()
const { Factorgrid } = require('../models/factorgrid')

//route to get factorgrid detials
router.get('/', (req, res) => {
    Factorgrid.find()
        .then((factorgrids) => {
            res.send(factorgrids)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a factorgrid 
router.post('/', (req, res) => {
    const body = req.body
    const factorgrid = new Factorgrid(body)
    factorgrid.save()
        .then((factorgrid) => {
            if (factorgrid) {
                res.send(factorgrid)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a factorgrid by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Factorgrid.findById({ _id: id })
        .then((factorgrid) => {
            if (factorgrid) {
                res.send(factorgrid)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a factorgrid 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Factorgrid.findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((factorgrid) => {
            if (factorgrid) {
                res.send(factorgrid)
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
    Factorgrid.findByIdAndDelete(id)
        .then((factorgrid) => {
            if (factorgrid) {
                res.send(factorgrid)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { factorgridRouter: router }