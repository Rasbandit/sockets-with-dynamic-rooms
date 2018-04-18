const app = require('express')(),
  bodyParser = require('body-parser'),
  socket = require('socket.io'),
  port = 8080;

app.use(bodyParser.json());

const io = socket(app.listen(port, () => console.log(`listening on port ${port}`)));

io.on('connection', socket => {
  socket.on('emit message', input => {
    socket.emit('generate response', input);
  });

  socket.on('broadcast message', input => {
    socket.broadcast.emit('generate response', input);
  });

  socket.on('blast message', input => {
    io.sockets.emit('generate response', input);
  });

  socket.on('room', input => {
    socket.join(input);
  });
});
