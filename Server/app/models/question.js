const mongoose = require('mongoose')
const {SubCategory} =require('./subcategory')
const { Schema } = mongoose
const questionSchema = new Schema({
    title: {
        type: String
        //required: true
    },
    
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
        //required:true
    },
    options:{
        type:[
            {
                option:{
                    type:Schema.Types.ObjectId,
                ref:'Option'
                }
            }

        ]
         
    },
    thresholdKey: {
        type: String,
        enum: ['', 'L', 'H']
    },
    
    // icon: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Icon"
    // }
    //create an icon category which will have title and image add image catergory ref to question schema
})
questionSchema.post('save',function(next){
    const question=this
SubCategory.findOne({ _id: question.subCategory})
.then((subCategory) => {
    subCategory.questions.push(question._id)
    subCategory.save().then(()=>{
        next()
    }) 
})
.catch((err)=>{
    console.log(err)
})
})
const Question = mongoose.model('Question', questionSchema)
module.exports = {
    Question
}
//create an icon category  which will have title and image 
//add an image category ref to question schema