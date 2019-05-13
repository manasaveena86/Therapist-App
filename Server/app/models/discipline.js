const mongoose = require('mongoose')
const {Schema} = mongoose
const disciplineSchema = new Schema({
    name:{
        type :String,
        required:true
    }
})
const Discipline = mongoose.model('Discipline',disciplineSchema)
module.exports={
    Discipline
}