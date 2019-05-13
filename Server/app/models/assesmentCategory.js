const mongoose = require('mongoose')
const {Schema} = mongoose
const assesmentCategorySchema = new Schema({
    name:{
        type:String,
        required : true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
})
const AssesmentCategory = mongoose.model('AssesmentCategory',assesmentCategorySchema)
module.exports={
    AssesmentCategory
}