import React, { Component } from 'react';
import { FirebaseConfig } from '../../assets/Config';
import AuthNavigator from './AuthNavigator';
import { Asset, AppLoading } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class RootNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true,
    };

    // Initialize firebase database
    if(!firebase.apps.length){ 
      firebase.initializeApp(FirebaseConfig); 
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    // Initializing firestore
    const firestore = firebase.firestore();
    //const settings = {timestampsInSnapshots: true}; 
    //firestore.settings(settings);
  }

  onAuthStateChanged = (user) => {
    if(user){
      this.setState({isAuthenticated: true, isLoading: false});
    } 
    else{
      this.setState({isAuthenticated: false, isLoading: false});
    }
  }

  /* Handles the images for the load screen */
  async _cacheResourcesAsync(){
    const images = [
      require('../../assets/images/logo.png'),
      require('../../assets/images/logo.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)
  }

  render(){
    if(this.state.isLoading){
      return(
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => null}
          onError={console.warn}
        />
      );
    }

    return(
      <AuthNavigator
        isAuthenticated={this.state.isAuthenticated}
      />
    );
  }
}