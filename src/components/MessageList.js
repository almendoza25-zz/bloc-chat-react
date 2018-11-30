import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          username: '',
          content: '',
          sentAt: ''
        },
      ],
      newMessage: ''
    };
    this.msgRef = this.props.firebase.database().ref('Messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.msgRef.on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(msg)});
    });
  }

  createMessage(event) {
    event.preventDefault();
    this.msgRef.push({
      content: this.state.newMessage,
      username: this.props.user ? this.props.user.displayName : 'Guest',
      roomId: this.props.activeRoomId,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({newMessage: ''});
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  formatTime(time) {
    const date = new Date(time);
    const hour = date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const newTime = hour + ':' + min + ':' + sec;
    return newTime;
  }

  render() {
    return (
      <section className="messages">
        {this.state.messages
          .filter(messages => messages.roomId === this.props.activeRoomId)
          .map(messages => (
            <div className="message-group" key={messages.key}>
              <div>{messages.username}</div>
              <div>{messages.content}</div>
              <div>{this.formatTime(messages.sentAt)}</div>
            </div>
          ))}
        <form className="add-message" onSubmit={this.createMessage}>
          <input
            type="text"
            placeholder="Enter messages here"
            value={this.state.newMessage}
            onChange={this.handleChange}
          />
          <input type="submit" value="Send" />
        </form>
      </section>
    );
  }
}

export default MessageList;
