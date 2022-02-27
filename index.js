const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const boolParser = require('express-query-boolean');

const app = express();

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_DB || 'mongodb://127.0.0.1/discord', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
app.set('view engine', 'ejs')

app.use('/api/private', async (req, res, next) => {
    if (process.env.API_KEY) {
        if (req.query.key != process.env.API_KEY) {
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
app.use(boolParser())

app.use('/api/private/drive', require('./routes/drive'))
app.use('/api/private/stat', require('./routes/stat'))

app.use('/dist', express.static('static'))

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/m3u8', limiter, require('./routes/playlist'))


app.get('/api/hls/:url',
    require('./routes/chunks'))


app.get('/api/iframe/:id', require('./routes/embed'))

app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}`)
})