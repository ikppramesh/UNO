'use strict';
const path = require('path');
const http = require('http');
const os = require('os');
const express = require('express');
const { Server } = require('socket.io');
const { RoomManager } = require('./rooms');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/health', (req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const io = new Server(server, { maxHttpBufferSize: 1e5 });
const manager = new RoomManager(io);
io.on('connection', (socket) => manager.handleConnection(socket));

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
  console.log(`\n  UNO Ultimate is running!\n\n  On this computer:  http://localhost:${PORT}`);
  for (const addrs of Object.values(os.networkInterfaces())) {
    for (const a of addrs || []) {
      if (a.family === 'IPv4' && !a.internal) console.log(`  On your Wi-Fi:     http://${a.address}:${PORT}`);
    }
  }
  console.log('');
});
