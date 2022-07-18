// DEPENDENCIES
const express = require('express')
let mongoose = require('mongoose')



// CONFIGURATION
require('dotenv').config()
let PORT = process.env.PORT
const app = express()

// ROUTES
app.get('/', (req, res) => {
    res.send(`Welcome to an Awesome App about Breads. This is the initial server point. Use this link and go to the main page. <h2>http://localhost:${process.env.PORT}/breads</h2>`)
  })
//DEPENDENCIES
let methodOverride = require('method-override')

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


  // Breads
  const breadsController = require('./controllers/breads_controller.js')
  app.use('/breads', breadsController)
  
  // 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })
  

// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)