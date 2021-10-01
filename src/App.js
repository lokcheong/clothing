import React from 'react';
// import logo from './logo.svg';
import {Switch, Route} from 'react-router-dom';

import './App.css';

//Pages
import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInSignUpPage from './pages/signin-signup/signin-signup.component.jsx'
import { auth } from './firebase/firebase.utils';

//Components
import Header from './components/header/header.component.jsx'

class App extends React.Component {
  constructor(){
    super();

    this.state ={
      currentUser: null
    };
  }

  unsubscribeFromAuth = null


  componentDidMount() {
    //note that firebase will return a function
    //called firebase.unsubscribe
    //storing this into unscrubscribeFromAuth
    //will allow us to call it to then unsubscribe from the listerner
    //when the app is fully closed
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser:user});

      console.log(user);
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
