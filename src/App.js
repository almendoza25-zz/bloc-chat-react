import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

var config = {
    apiKey: "AIzaSyAKAlASuiNZl6tTcEMvlW718o_rHwtQ3dM",
    authDomain: "bloc-chat-react-438d8.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-438d8.firebaseio.com",
    projectId: "bloc-chat-react-438d8",
    storageBucket: "bloc-chat-react-438d8.appspot.com",
    messagingSenderId: "426496830872"
  };
  firebase.initializeApp(config);

  const App = () => (
     <main className="wrapper">
       <header className="app-title">
         <h1>Bloc Chat</h1>
       </header>
       <section className="rows">
         <section className="room-list">
           <RoomList firebase={firebase} />
         </section>
         <section className="message-list">
           <p>Placeholder for Message List</p>
         </section>
       </section>
     </main>
   );

export default App;
