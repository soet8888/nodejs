
const express = require('express')
const router = express.Router()
const { jsonWrap } = require('./wrap')
const { heartbeatHandler, employeeHandler } = require('./handler')

// GET the home landing page
router.get('/' || '/hb', jsonWrap(heartbeatHandler))
router.get('/emp', jsonWrap(employeeHandler))
module.exports = router
