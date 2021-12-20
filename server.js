const express = require('express');
const socket = require('socket.io');

const app = express();

let tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);
io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', task => {
    console.log(`${socket.id} adds ${task}`);
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });
  socket.on('removeTask', i => {
    console.log(`${socket.id} removes task ${i}`);
    tasks.splice(i, 1);
    socket.broadcast.emit('removeTask', i);
  });
});