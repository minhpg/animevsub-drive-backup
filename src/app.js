const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_DB || 'mongodb://127.0.0.1/drive-backup')

app.use('/files', require('./routes/files'))
app.use('/drive', require('./routes/drive'))

app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}`)
})