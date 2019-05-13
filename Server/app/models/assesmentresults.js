const mongoose = require('mongoose')
const {Schema} = mongoose
const assesmentResultSchema = new Schema({
    assesment: {
        type: Schema.Types.ObjectId,
        ref: "Assesment"
        
    },
    results: {
        type: [
            {
                subcategory: {
                    type: Schema.Types.ObjectId,
                    ref: 'SubCategory'
                },
                questions: [
                    {
                        question: {
                            type: Schema.Types.ObjectId,
                            ref: "Question"
                        },
                        option: {
                            type: Schema.Types.ObjectId,
                            ref: 'Option'
                        }
                    }
                ],
                rawScore: {
                    type: Number
                }
            }
        ]
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

})

const AssesmentResult = mongoose.model('AssesmentResult', assesmentResultSchema)
module.exports = {
    AssesmentResult
}

// [
    // {
    //     "subCategory": "123",
    //     "questions": [
    //         {
    //             "question": 1,
    //             "option": 1
    //         },
    //         {
    //             "question": 2,
    //             "option" :1
    //         }
    //     ],
    //     "rawScore": 40
    // },
//     {
//         "subCategory": "124",
//         "questions": [
//             {
//                 "question": 1,
//                 "option": 1
//             },
//             {
//                 "question": 2,
//                 "option" 1
//             }
//         ]
//     }
// ]