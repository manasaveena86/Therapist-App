const express = require('express')
const router = express.Router()
const { Category } = require('../models/category')

//route to get category detials
router.get('/', (req, res) => {
    console.log('entered into router')
    Category.find()
    
        .then((categories) => {
            
            res.send(categories)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a category 
router.post('/', (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then((category) => {
            if (category) {
                res.send(category)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a category by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById({ _id: id })
        .then((category) => {
            if (category) {
                res.send(category)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a category 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Category.findByIdAndUpdate({ _id: id },{$set:body}, { new: true })
        .then((category) => {
            if (category) {
                res.send(category)
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
    Category.findByIdAndDelete(id)
        .then((category) => {
            if (category) {
                res.send(category)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { categoryRouter: router }