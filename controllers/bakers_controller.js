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

//Index route
baker.get('/', (req, res) =>{
    Baker.find()
    .populate('breads')
    .then((foundBakers)=>{
        res.send(foundBakers)
    })
})

//Show baker Route
baker.get('/:id', (req, res)=>{
    Baker.findById(req.params.id)
    .populate('breads')
    .then((foundBaker)=>{
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
})

module.exports = baker