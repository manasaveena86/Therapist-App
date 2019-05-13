const mongoose = require('mongoose')
const {AssesmentResult} = require('./assesmentresults')
const {Category}= require('./category')
const {Question}=require('./question')
const { Schema } = mongoose
const {SubCategory} =require('./subcategory')
const assesmentSchema = new Schema({
    child: {
        type: Schema.Types.ObjectId,
        ref: "Child",
        required: true
    },
    assesmentDate: {
        type: Date,
        required: false
    },
    discipline: {
        type: Schema.Types.ObjectId,
        ref:'Discipline',
        required: true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
    // assesmentCategory: {
    //     type: Schema.Types.ObjectId,
    //     ref: "AssesmentCategory"
    // }

})

assesmentSchema.post('save',function(next){
   
    const assesmentResult = new AssesmentResult()
    assesmentResult.assesment=this._id
    let assesResult={}
    let questionsArray=[]
    let questionIds=[]
    let questionObject={}
     SubCategory.find()
      .then((subcategories)=>{
        console.log(subcategories)
        subcategories.forEach((subcategory)=>{
            assesResult.subcategory=subcategory._id
            questionIds=subcategory.questions
            questionsArray=[]
            for(let i=0;i<questionIds.length;i++){
                questionObject={}
                questionObject.question=questionIds[i]
                console.log(questionObject)
                questionsArray.push(questionObject)
                console.log(questionsArray)
            }
            console.log(questionsArray)
            assesResult.questions=questionsArray
            assesmentResult.results.push(assesResult)
            assesmentResult.save()
            .then((result)=>{
                console.log(result)
                next()
            })
            })
           
          
            
           
           
        })
    .catch((err)=>{
        console.log(err)
    })
    
})
const Assesment = mongoose.model('Assesment', assesmentSchema)
module.exports = {
    Assesment
}