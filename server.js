// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
let PORT = process.env.PORT
const app = express()

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
  })

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))


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

