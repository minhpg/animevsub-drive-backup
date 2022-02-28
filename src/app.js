const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_DB || 'mongodb://127.0.0.1/drive-backup')

app.use('/api', (req, res, next) => {
    const key = req.query.key
    if(process.env.API_KEY){
        if (key != process.env.API_KEY) {
            res.status(404)
            res.end()
        }
        else {
            next()
        }
    }
    else {
        next()
    }
})

app.use('/api/files', require('./routes/files'))
app.use('/api/drive', require('./routes/drive'))

app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}`)
})