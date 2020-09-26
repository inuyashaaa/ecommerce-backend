const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Import Routes
const authRoute = require('./routes/auth')

// Route Middleware
app.use('/api/user', authRoute)

app.get('/', (req, res) => {
  res.send('ECommerce API')
})

module.exports = app
