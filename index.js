const express = require('express')
const bookshelf = require('./src/databases')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(3000, () => {
  console.log('================================================');
  console.log('App is running on PORT: ', 3000);
  console.log('================================================');
})
