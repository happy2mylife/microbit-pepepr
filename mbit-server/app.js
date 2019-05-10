const WebSocket  = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
var connections = [];
wss.on('connection', (ws) => {
    console.log('[SERVER] connection');
    connections.push(ws);
    ws.on('message', function(message) {
      console.log('SERVER received: %s', message);
      connections.forEach(function(c) {
        c.send(message);
      });
    });
    ws.on('close', function() {
      console.log('close');
      connections = connections.filter(function(conn, i) {
        return conn === ws ? false : true;
      });
    });
});