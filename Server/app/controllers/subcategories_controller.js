const express = require('express')
const router = express.Router()
const { SubCategory } = require('../models/subcategory')

//route to get subcatergory detials
router.get('/', (req, res) => {
    SubCategory.find()
    .populate('category')
   
        .then((subcategories) => {
            res.send(subcategories)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add a subcatergory 
router.post('/', (req, res) => {
    const body = req.body
    const subcategory = new SubCategory(body)
    //console.log("im here")
    subcategory.save()
        .then((subcategory) => {
            if (subcategory) {
                res.send(subcategory)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a subcatergory by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    SubCategory.findById({ _id: id })
    .populate('category')
        .then((subcategory) => {
            if (subcategory) {
                res.send(subcategory)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a subcategory 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    SubCategory.findByIdAndUpdate({ _id: id }, {$set:body}, { new: true })
        .then((subcategory) => {
            if (subcategory) {
                res.send(subcategory)
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
    SubCategory.findByIdAndDelete(id)
        .then((subcategory) => {
            if (subcategory) {
                res.send(subcategory)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { subcategoryRouter: router }