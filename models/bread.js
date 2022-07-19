// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'https://placekitten.com/200/300' },
    baker: {
      type: String,
      enum: ['Rachael', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    }
})

// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread

  