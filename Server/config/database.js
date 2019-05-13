// DB CONFIGURATION 

const mongoose = require('mongoose')

// telling mongoose to use ES6's promise library 
mongoose.Promise = global.Promise
console.log( process.env.MONGODB_URI)
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/therapist-app'
console.log(CONNECTION_URI)

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log(err))

   // 'mongodb://localhost:27017/therapist-app'
   //mongodb+srv://manasa:sgdmvd99@cluster0-gngek.mongodb.net/test?retryWrites=true