const express = require('express')
const router = express.Router()


router.get('/create/:file_id', require('./create'))
router.get('/get/:file_id', require('./get'))
router.get('/list', require('./list'))

module.exports = router