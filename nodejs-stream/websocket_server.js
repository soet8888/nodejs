const http = require('http')
const app = require('./express')
const port = 8000
// app.use((req, res) => {
//     console.log("app req", req)
// })
// app.get('/ws', (req, res) => {
//     console.log('web socket api')
//     const wsServer = new websocketServer(
//         {
//             httpServer: app,
//             autoAcceptConnections: false,
//         }
//     )
//     wsServer.on('request', (req) => {
//         console.log('ws: request event')
//     })
//     wsServer.on('connect', (req) => {
//         console.log('ws: connect event')
//     })
// })
app.listen(port, console.log(`Sever listening at port:${port}`))


