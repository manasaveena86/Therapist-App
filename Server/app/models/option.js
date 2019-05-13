const mongoose = require('mongoose')
const { Schema } = mongoose
const optionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // category: {
    //     type : Schema.Types.ObjectId,
    //     ref: Category
    // },
    points: {
        type: Number,
        required: true
    }
})
const Option = mongoose.model('Option', optionSchema)
module.exports = {
    Option
}