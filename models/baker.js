//dependencies
let mongoose = require('mongoose')
//shorthand for Schema defined
let {Schema} = mongoose
let Bread = require('./bread')


//schema
let bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String,
    }, {toJSON: {virtuals: true}})

//virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

//model and export
let Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker