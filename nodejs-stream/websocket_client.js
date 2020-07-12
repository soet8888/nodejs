const WebsocketClient = require('websocket').client

const client = new WebsocketClient()

client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function () {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            // setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
})

client.on('connectFailed', (err) => {
    console.log(`client connection failed: ${err.message}`)
})
client.connect('http://localhost:8000/', 'echo-protocol')