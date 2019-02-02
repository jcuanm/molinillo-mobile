import React, { Component } from 'react'
import FirebaseConfig from '../../assets/config/FirebaseConfig';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
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
    if (!firebase.apps.length) { firebase.initializeApp(FirebaseConfig.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    // Initializing firestore
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
  }

  onAuthStateChanged = (user) => {
    if(user){
      this.setState({isAuthenticated: true, isLoading: false});
    } else{
      this.setState({isAuthenticated: false, isLoading: false});
    }
  }

  /* Handles the images for the load screen */
  async _cacheResourcesAsync() {
    const images = [
      require('../../assets/images/splash.png'),
      require('../../assets/images/icon.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)
  }

  render() {
    // Render the LoadScreen if it is unknown if the user has been authenticated
    if(this.state.isLoading){
      return(
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => null}
          onError={console.warn}
        />
      )
    }

    // Render Auth Stack when done loading
    if (!this.state.isAuthenticated){ return( <UnauthenticatedNavigator/> ); }

    // Keep the user signed in if previously signed in
    return (<AuthenticatedNavigator/>);
  }
}