const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
  .then(foundBreads => {
    //console.log(foundBreads)
    res.render('Index',
    {
      breads: foundBreads,
      title: 'Index Page'
    })
    
  })

 })

// CREATE
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


// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then((foundBread)=>{
  res.render('edit', {
      bread: foundBread  
  })
  })
})

// SHOW
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
          let bakedBy = foundBread.getBakedBy()
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
