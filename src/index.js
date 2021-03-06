const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Import Routes
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)

// API for verifying server is running, show latest git commit info
app.get('/', function (req, res) {
  const cmd = 'git log -n 1'
  const exec = require('child_process').exec
  exec(cmd, function (error, stdout, stderr) {
    if (error !== null) {
      const msg = 'Error during the execution of git command: ' + stderr
      return res.send(msg)
    }
    res.status(200).send('Current git commit: ' + stdout)
  })
})

// ------------------------------------------------------------------------------
// HTTP Server

// Hook for gitlab auto deploy
app.post('/github', function (req, res) {
  console.log('Received a github hook event (POST)')
  const exec = require('child_process').exec
  exec('./deploy ' + 'ecommerce', function (error, stdout, stderr) {
    console.log(stdout)
    if (error !== null) {
      console.log('Error during the execution of redeploy: ' + stderr)
    }
  })

  res.status(200).send()
})

// GET
app.get('/github', function (req, res) {
  console.log('Received a github hook event (GET)')

  const exec = require('child_process').exec
  exec('./deploy ' + 'ecommerce', function (error, stdout, stderr) {
    console.log(stdout)
    if (error !== null) {
      console.log('Error during the execution of redeploy: ' + stderr)
      return
    }

    // Retrieve last git status again
    const cmd = 'git log -n 1'
    exec(cmd, function (error, stdout, stderr) {
      console.log('git log -n 1')
      if (error !== null) {
        const msg = 'Error during the execution of git command: ' + stderr
        return res.send(msg)
      }
      res.status(200).send('Current git commit: ' + stdout)
    })
  })

  // don't return immediately
  // res.status(200).send("deployed");
})
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Page not found' })
})

module.exports = app
