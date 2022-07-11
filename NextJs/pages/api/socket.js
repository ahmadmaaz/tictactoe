const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send("Hey")
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3050, () => {
  console.log('listening on *:3050');
});