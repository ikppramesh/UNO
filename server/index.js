'use strict';
const path = require('path');
const http = require('http');
const os = require('os');
const express = require('express');
const { Server } = require('socket.io');
const { RoomManager } = require('./rooms');

const app = express();
app.disable('x-powered-by');

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' wss:",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');
const PERMISSIONS = [
  'accelerometer', 'autoplay', 'camera', 'display-capture', 'geolocation', 'gyroscope',
  'magnetometer', 'microphone', 'payment', 'usb', 'midi',
].map((f) => `${f}=()`).join(', ');
app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': CSP,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': PERMISSIONS,
  });
  next();
});
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
