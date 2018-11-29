import React, {Component} from 'react';
 import './User.css';

 class User extends Component {
   constructor(props) {
     super(props);

     this.googleSignIn = this.googleSignIn.bind(this);
     this.signOut = this.signOut.bind(this);
   }

   componentDidMount() {
     this.props.firebase.auth().onAuthStateChanged(user => {
       this.props.setUserName(user);
     });
   }

   googleSignIn() {
     const provider = new this.props.firebase.auth.GoogleAuthProvider();
     this.props.firebase
       .auth()
       .signInWithPopup(provider)
       .then(function(result) {
         console.log(result);
         console.log('Success Google Login');
       })
       .catch(function(error) {
         console.log(error);
         console.log('Failed to Sign in with Google');
       });
   }

   signOut() {
     this.props.firebase
       .auth()
       .signOut()
       .then(function(result) {
         console.log(result);
         console.log('Successful Sign Out');
       })
       .catch(function(error) {
         console.log(error);
         console.log('Failed to Sign Out');
       });
   }

   render() {
     return (
       <div className="user">
         <section className="btn-group-lilo">
           <button type="button" onClick={this.googleSignIn}>
             Google Sign-In
           </button>

           <button type="button" onClick={this.signOut}>
             Sign-Out
           </button>
         </section>

         <section className="show-username">
           Signed In As:
           {this.props.user ? this.props.user.displayName : 'Guest'}
         </section>
       </div>
     );
   }
 }

 export default User;
