//dependencies
let express = require('express')
let baker = express.Router()
let Baker = require('../models/baker.js')
let bakerSeedData = require('../models/baker_seed.js')

//SEED route
baker.get('/data/seed', (req, res)=>{
    Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
})

module.exports = baker