const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const cors = require('cors')
const mongoose = require('mongoose')

const index = require('./routes/index')
const movies = require('./routes/movies')
const actors = require('./routes/actors')
const directors = require('./routes/directors')

const app = express()
const port = 3200

//View Engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.engine('html',ejs.renderFile)

//Set Static Folder(used for writing all the angular stuff)
app.use(express.static(path.join(__dirname,'client')))

//Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Body Parser Cors
app.use(cors())

app.use('/',index)
app.use('/api',movies)
app.use('/api2',actors)
app.use('/api3',directors)

app.listen(port,()=>{
    console.log('server started at port ',port)
})