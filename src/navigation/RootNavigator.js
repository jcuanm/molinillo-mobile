import React, { Component } from 'react'
import FirebaseConfig from '../../assets/config/FirebaseConfig';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import * as firebase from 'firebase';

export default class RootNavigator extends Component{
  constructor(props){
    super(props);

    this.state = {
      isAuthenticated: false,
    };

    // Initialize firebase database
    if (!firebase.apps.length) { firebase.initializeApp(FirebaseConfig.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticated: !!user});
  }

  render() {
    return  (
      this.state.isAuthenticated ? <AuthenticatedNavigator/> : <UnauthenticatedNavigator/>
    );
  }
}