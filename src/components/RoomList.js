import React, {Component} from 'react';
import './RoomList.css';
import Modal from 'react-awesome-modal';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      visible: false,
      roomName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
}

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

openModal() {
   this.setState({visible: true});
 }

 closeModal() {
   this.setState({visible: false});
 }

 handleChange(event) {
   this.setState({roomName: event.target.value});
 }

 createRoom(event) {
   event.preventDefault();
   this.roomsRef.push({name: this.state.roomName});
   this.setState({roomName: ''});
 }

render() {
  return (
    <div>
         <section className="rooms">
           {this.state.rooms.map(room => (
             <p key={room.key} onClick={() => this.props.setActiveRoom(room)}>
              {room.name}
             </p>
           ))}
         </section>
         <section>
           <input
             className="add-room-button"
             type="button"
             value="Create New Room"
             onClick={() => this.openModal()}
           />
         </section>

         <Modal
           className="add-room-popup"
           visible={this.state.visible}
           width="400"
           height="300"
           effect="fadeInUp"
           onClickAway={() => this.closeModal()}
         >
           <form className="add-room-form" onSubmit={this.createRoom}>
             <label>
               Enter New Room Name:
               <input
                 className="form-field"
                 type="text"
                 placeholder="New Room Name"
                 value={this.state.roomName}
                 onChange={this.handleChange}
               />
             </label>
             <input className="submit-button" type="submit" onClick={() => this.closeModal()} />
           </form>
           <button className="close-modal-button" type="button" onClick={() => this.closeModal()}>
             Cancel
           </button>
         </Modal>
       </div>
     );
   }
}

export default RoomList;
