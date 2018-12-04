// server.js
// require uuid
const uuidv4 = require('uuid/v4');
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');

  const users = {};
  users.id = uuidv4();
  users.type = 'incomingUserUpdate';
  users.amount = wss.clients.size;
  wss.broadcast(JSON.stringify(users));



  ws.on("message", function recieveData(data) {
    console.log(data);
    // JSON.parse data to be readable/usable as a string
    const message = JSON.parse(data);
    // adds key "id" (uuid generated) to data and sets it to variable "message"
    message.id = uuidv4();

    if (message.type === "postMessage") {
      message.type = "incomingMessage";
    } else if (message.type === "postNotification") {
      message.type = "incomingNotification";
    } else {
      console.log("mucho problemo");
    }


    // stringify the new message with id for server to read
    const stringMessage = JSON.stringify(message);
    // sends the data back to the client with uuid id included
    wss.broadcast(stringMessage);
    // console.log('in server: ', message)
    // console.log(`ID ${uuid()} User ${message.username} said ${message.content}`);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    users.amount = wss.clients.size;
    wss.broadcast(JSON.stringify(users));
  });
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log(client.readyState);
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};