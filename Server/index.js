const express = require('express')
const cors = require('cors')
const app = express()
//const port = 3001
 const port = process.env.PORT || 5000

const path = require('path')
 app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')))
const { childRouter } = require('./app/controllers/children_controller')
const { categoryRouter } = require('./app/controllers/categories_controller')
const { subcategoryRouter } = require('./app/controllers/subcategories_controller')
const { questionRouter } = require('./app/controllers/questions_controller')
const { optionRouter } = require('./app/controllers/options_controller')
const { factorgridRouter } = require('./app/controllers/factorgrids_controller')
const { factorsummaryRouter } = require('./app/controllers/factorsummarys_controller')
const { assesmentRouter } = require('./app/controllers/assesments_controller')
const { assesmentResultRouter } = require('./app/controllers/assementResults_controller')
const { userRouter } = require('./app/controllers/users_controller')
const {iconRouter} =require('./app/controllers/icons_controller')
const {disciplineRouter} = require('./app/controllers/disciplines_controller')
const {assesmentCategoryRouter} = require('./app/controllers/assesmentCategories_controller')
require('./config/database')

app.get('/', (req, res) => {
    res.send('welcome to therapist-code')
})

app.use('/public/uploads',express.static("public/uploads"))
app.use('/child', childRouter)
app.use('/category', categoryRouter)
app.use('/subcategory', subcategoryRouter)
app.use('/question', questionRouter)
app.use('/option', optionRouter)
app.use('/factorgrid', factorgridRouter)
app.use('/factorsummary', factorsummaryRouter)
app.use('/user', userRouter)
app.use('/assesment', assesmentRouter)
app.use('/assesmentResult', assesmentResultRouter)
app.use('/icon',iconRouter)
app.use('/discipline',disciplineRouter)
app.use('/assesmentCategory',assesmentCategoryRouter)
app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
       })  
app.listen(port, () => {
    console.log('Listening to port', port)
})