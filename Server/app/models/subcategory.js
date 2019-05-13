const mongoose = require('mongoose')
const { Schema } = mongoose
const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }, 
    questions:{ 
        type:[Schema.Types.ObjectId],
        ref:'Question'
    }

    
})
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = {
    SubCategory
}

// SubCategory.find().populate('questions')