import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
    this.msgRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.msgRef.on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(msg)});
    });
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
              <div>{messages.sentAt}</div>
            </div>
          ))}
      </section>
    );
  }
}

export default MessageList;
