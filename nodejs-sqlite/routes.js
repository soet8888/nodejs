
const express = require('express')
const router = express.Router()
const { jsonWrap } = require('./middleware')
const { heartbeatHandler, employeeHandler } = require('./handler')

// GET the home landing page

router.get('/hb', jsonWrap(heartbeatHandler))
router.get('/emp', jsonWrap(employeeHandler))
router.get('/emp/:empId', jsonWrap(employeeHandler))
router.post('/emp', jsonWrap(employeeHandler))
router.put('/emp/:empId', jsonWrap(employeeHandler))
router.delete('/emp/:empId', jsonWrap(employeeHandler))
module.exports = router
