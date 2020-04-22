
module.exports.catchErrors = (fn) => {
    return function (request, response, next) {
        return fn(request, response, next).catch((e) => {
            if (e.response) {
                e.status = e.response.status
            }
            next(e)
        })
    }
}
module.exports.jsonWrap = (fn) => {
    return async function (req, res, next) {
        var data = await fn(req, res, next)
        res.write(JSON.stringify(data))
        res.end()
    }
}
module.exports.NewErrorStatus = (msg) => {
    return { 'status': 'Error', 'message': msg, 'data': '' }
}
module.exports.NewOkStatus = (data) => {
    return { 'status': "Ok", 'message': '', 'data': data }
}