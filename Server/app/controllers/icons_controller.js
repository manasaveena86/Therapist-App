const express = require('express')
const router = express.Router()
const { Icon} = require('../models/icon')
const multer = require('multer')
//var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+"-"+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
//route to get child detials
router.get('/', (req, res) => {
   Icon.find()
        .then((icon) => {
            res.send(icon)
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to add aIcon 
router.post('/',upload.single('icon') ,(req, res) => {
    console.log(req.file)
    const destination = req.file.destination
    const imagePath="http://localhost:3001" +destination.slice(1)+req.file.filename
    console.log(imagePath)
    const body = req.body
    //body = body.imagePath 
    body.icon = imagePath
    console.log(body)
    const icon = new Icon(body)
   icon.save()
        .then((icon) => {
            if (icon) {
                res.send(icon)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

//route to edit a child 
router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    Icon.findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((icon) => {
            if (icon) {
                res.send(icon)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


//route - to get a icon by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    Icon.findById({ _id: id })
        .then((icon) => {
            if (icon) {
                res.send(icon)
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
    Icon.findByIdAndDelete(id)
        .then((icon) => {
            if (icon) {
                res.send(icon)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })

})

module.exports = { iconRouter: router }