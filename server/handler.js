const os = require('os')
const emp = require('./model/employee')
const db = require('./config/database')
const { NewOkStatus } = require('./wrap')
module.exports.heartbeatHandler = (req, res, next) => {
    console.log(`Request:${req} \n Response:${res}`)
    return NewOkStatus({ "Vesion": 1.0, "Freee Mem": os.freemem(), "Total Mem": os.totalmem() })
}
module.exports.employeeHandler = async (req, res, next) => {
    db.authenticate()
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Error: ' + err))
    emps = await emp.findAll()
    return NewOkStatus({ "emp": emps })
}