//dependencies
let mongoose = require('mongoose')
//shorthand for Schema defined
let {Schema} = mongoose

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
    bio: String
})

//model and export
let Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker