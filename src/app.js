import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import initializeDb from './db/initializer'
import middleware from './middleware'
import api from './api'
import config from './config.json'
import path from 'path'

let app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
  limit : config.bodyLimit
}))

// Mount static folder
app.use('/public', express.static(path.join(__dirname, '../public')))

// connect to db
initializeDb( db => {

  // internal middleware
  app.use(middleware({ config, db }))

  // api router
  app.use('/api', api({ config, db }))

  app.server.listen(process.env.PORT || config.port)

  console.log(`Started on port ${app.server.address().port}`)
})

export default app
