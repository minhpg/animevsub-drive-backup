const express = require('express')
const router = express.Router()

router.get('/create/:shared_drive_id',require('./create'))
router.get('/get/:shared_drive_id',require('./get'))
router.get('/list',require('./list'))

module.exports = router