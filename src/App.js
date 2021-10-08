import React from 'react';
// import logo from './logo.svg';
import {Switch, Route} from 'react-router-dom';

import './App.css';

//Pages
import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInSignUpPage from './pages/signin-signup/signin-signup.component.jsx'
import { auth , createUserProfileDocument} from './firebase/firebase.utils';

//Components
import Header from './components/header/header.component.jsx'

class App extends React.Component {
  constructor(){
    super();

    this.state ={
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;


  componentDidMount() {
    //note that firebase will return a function
    //called firebase.unsubscribe
    //storing this into unscrubscribeFromAuth
    //will allow us to call it to then unsubscribe from the listerner
    //when the app is fully closed
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser:userAuth});

      //check if there is a user, if not then create the user profile
      //in firestore
      // createUserProfileDocument(userAuth)
      // console.log(userAuth);

      if (userAuth) {
        //if the user dosen't exists, we create a new one san store it
        const userRef = await createUserProfileDocument(userAuth);

        //we then use onSnapshot to access the real-time data
        //that is stored in the db for the user
        //and now change our state currentUser to it
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {console.log(this.state);})
        });
      } else {
        this.setState({ currentUser: userAuth});
      }
    });
  }

  //prevent memory leak from keep listerning to firebase OAuth
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }



  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />      
          <Route path='/signin' component={SignInSignUpPage} />  
        </Switch>
      </div>
    );
  }
}

export default App;
