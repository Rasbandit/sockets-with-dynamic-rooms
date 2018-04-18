import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = props.room;
  }

  render() {
    const { handleChange, sendMessage } = this.props;
    const messages = this.state.messages.map(message => <p>{message}</p>);
    return (
      <section>
        <h1>{this.state.name}</h1>
        <div className="text">{messages}</div>
        <input
          type="text"
          value={this.state.message}
          onChange={e => {
            handleChange(e.target);
          }}
          name={this.state.name}
        />
        <div className="buttons">
          <div
            className="button"
            onClick={e => {
              sendMessage('emit', this.state.path, this.state.name, this.state.message);
            }}
          >
            Emit
          </div>
          <div
            className="button"
            onClick={e => {
              sendMessage('broadcast', this.state.path, this.state.name, this.state.message);
            }}
          >
            Broadcast
          </div>
          <div
            className="button"
            name="blast"
            onClick={e => {
              sendMessage('blast', this.state.path, this.state.name, this.state.message);
            }}
          >
            Blast
          </div>
        </div>
      </section>
    );
  }
}

export default Chat;
