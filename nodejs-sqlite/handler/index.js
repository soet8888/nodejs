const os = require('os')
const { NewOkStatus, NewErrorStatus } = require('../middleware')
const db = require('../sqlite')
objectKeyByValue = (obj, value) => {
    for (var key in obj) {
        if (obj[key] === value) {
            return key
        }
    }
    return undefined
}
module.exports.heartbeatHandler = async (req, res, next) => {
    return NewOkStatus({ "Vesion": 1.0, "Freee Mem": os.freemem(), "Total Mem": os.totalmem() })
}
module.exports.employeeHandler = async (req, res, next) => {
    let method = objectKeyByValue(req.route.methods, true)
    if (method === "get") {
        let data
        try {
            data = req.route.path === '/emp/:empId' ?
                await db.models.Employee.getById(parseInt(req.params.empId)) :
                await db.models.Employee.getAll()
            data = JSON.parse(JSON.stringify(data))
        } catch (e) {
            return NewErrorStatus(error)
        }
        return NewOkStatus(data)
    } else if (method === "post") {
        var obj = {}
        obj.firstname = req.body.firstname
        obj.lastname = req.body.lastname
        let data
        try {
            data = await db.models.Employee.create(obj)
        } catch (error) {
            return NewErrorStatus(error.message)
        }
        return NewOkStatus(data)
    } else if (method === "put") {
        var obj = {}
        obj.firstname = req.body.firstname
        obj.lastname = req.body.lastname
        let data
        try {
            data = await db.models.Employee.update(obj, parseInt(req.params.empId))
        } catch (error) {
            return NewErrorStatus(error.message)
        }
        return NewOkStatus(data)
    } else if (method === "delete") {
        let data
        try {
            data = await db.models.Employee.delete(req.params.empId)
        } catch (error) {
            return NewErrorStatus(error.message)
        }
        return NewOkStatus(data)
    } else if (method === "options") {
        return NewOkStatus('allow cors origin')
    }
    return NewErrorStatus('Invalid request method.')
}