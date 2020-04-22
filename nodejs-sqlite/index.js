
const app = require('./app')
const http = require('http')
const db = require('./sqlite')
// initialize port 
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)


initializeDb()
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        // Named pipe
        return val
    }
    if (port >= 0) {
        // Port number
        return port
    }
    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}
function onListening() {
    const addr = server.address()
    const uri = typeof addr === 'string' ? addr : `http://localhost:${addr.port}`
    console.log(`Sever listening on ${uri}`)
}
// database initialize and migration
async function initializeDb() {
    try {
        await db.sequelize.authenticate()
        console.log('database connection success..')
        await db.sequelize.sync({ force: false })
    } catch (e) {
        console.error("database connectin failed")
        process.exit(1)
    }
}