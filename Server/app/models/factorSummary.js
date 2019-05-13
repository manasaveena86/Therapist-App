const mongoose = require('mongoose')
const { Schema } = mongoose
const factorSummarySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "FactorGrid"
    },
    factorRawTotal: {
        type: Schema.Types.ObjectId,
        ref: "FactorGrid"
    },
    typicalPerformance: {
        type: [Number],
        required: true
    },
    probablePerformance: {
        type: [Number],
        required: true
    },
    definiteDifference: {
        type: [Number],
        required: true
    }
})
const FactorSummary = mongoose.model('FactorSummary', factorSummarySchema)
module.exports = {
    FactorSummary
}