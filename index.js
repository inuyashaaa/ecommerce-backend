const app = require('./src')

const { app: { port } } = require('./src/configs')

app.listen(port, () => {
  console.log('App is running on PORT: ', port)
})
