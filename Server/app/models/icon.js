const mongoose = require('mongoose')
const { Schema } = mongoose
const IconSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})
const Icon = mongoose.model('Icon', IconSchema)
module.exports = {
    Icon
}