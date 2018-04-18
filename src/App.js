import React, { Component } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import './App.css';

const socket = io();

class App extends Component {
  constructor() {
    super();

    this.state = {
      rooms: [
        {
          name: 'General',
          path: '/',
          messages: ['Hey', 'Bob'],
          connected: true,
          message: '',
        },
      ],
      newRoom: '',
    };

    socket.on('generate response', data => {
      const roomArr = [...this.state.rooms];
      roomArr.map(room => {
        if (room.name === data.name) room.messages.push(data.message);
        return room;
      });
      this.setState({ rooms: roomArr });
    });

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(target) {
    let newMessage = [...this.state.rooms];
    newMessage = newMessage.map(room => {
      if (room.name === target.name) {
        room.message = target.value;
      }
      return room;
    });
    this.setState({ rooms: newMessage });
  }

  sendMessage(type, path, name, message) {
    socket.emit(`${type} message`, { room: path, message, name });
    let newMessage = [...this.state.rooms];
    newMessage = newMessage.map(room => {
      if (room.name === name) {
        room.message = '';
      }
      return room;
    });
    this.setState({ message: '', rooms: newMessage });
  }

  joinRoom(room) {
    const rooms = [...this.state.rooms];
    const newRoom = { name: room, path: `/${room}`, messages: [], message: '' };
    rooms.push(newRoom);
    socket.emit('room', room);
    this.setState({ newRoom: '', rooms });
  }

  render() {
    const rooms = this.state.rooms.map(element => (
      <Chat room={element} handleChange={this.handleChange} sendMessage={this.sendMessage} />
    ));
    return (
      <div className="App">
        <div className="rooms">{rooms}</div>
        <div>
          <label>Room to join</label>
          <input
            type="text"
            value={this.state.newRoom}
            onChange={({ target: { value } }) => {
              this.setState({ newRoom: value });
            }}
          />
          <button
            onClick={() => {
              this.joinRoom(this.state.newRoom);
            }}
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }
}

export default App;
