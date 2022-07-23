const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
let Baker = require('../models/baker.js')

// INDEX route
breads.get('/', async (req, res) => {
  let foundBakers = await Baker.find().lean()
  let foundBreads = await Bread.find().limit(10).lean()
  //console.log(foundBreads)
  //console.log(foundBakers)
    res.render('Index',
    {
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page'
    })
    
    })


// CREATE route
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  //console.log(req.body)
  res.redirect('/breads')
})


// NEW route
breads.get('/new', (req, res) => {
  Baker.find()
  .then((foundBakers)=>{
  res.render('new', {
    bakers: foundBakers
    })
  })
})

// EDIT route
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then((foundBread)=>{
  res.render('edit', {
      bread: foundBread  
  })
  })
})

// SHOW route
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then((foundBread) => {
          //let bakedBy = foundBread.getBakedBy()
          //console.log(bakedBy)
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err =>{
          res.send('404')
        })
})


//DELETE
breads.delete('/:id', (req, res)=>{
  Bread.findByIdAndDelete(req.params.id)
  .then((deletedBread)=>{
    res.status(303).redirect('/breads')
    console.log(deletedBread)
  })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedBread)=>{
    console.log(updatedBread)
    res.redirect(`/breads/${req.params.id}`)
  })
})




module.exports = breads
