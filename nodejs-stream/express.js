const express = require('express');
const expressWs = require('express-ws')(express());
const app = expressWs.app
const aWss = expressWs.getWss('/')
app.get('/', (req, res) => {
    res.end("Websocket Tutuorial")
})
app.ws('/', (ws, req) => {
    console.log(`ws: connection ${ws}`)
    ws.on('message', (message) => {
        aWss.clients.forEach(client => client.send("Send from socket:" + message))
    })
    ws.on('open', () => console.log('socket open...'))
})
module.exports = app