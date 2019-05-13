const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose
const childSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    childPhoto: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
    },
    majorConcerns: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        maxlength: 10,
        
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function (value) {
                return 'invalid email id'
            }
        }
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})
const Child = mongoose.model('Child', childSchema)
module.exports = {
    Child
}