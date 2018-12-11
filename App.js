import React, { Component } from 'react'
import {
  createAppContainer,
  createDrawerNavigator, 
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { MaterialCommunityIcons, EvilIcons} from '@expo/vector-icons';
import Home from './Home';  // Tab Nav
import Login from './Login/pages/Login';  
import Signup from './Login/pages/Signup';
import Settings from './Settings';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

const drawerStack = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ( <MaterialCommunityIcons name="home" size={27} color="green" />),
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ( <MaterialCommunityIcons name="home" size={27} color="green" /> ),
    }
  }
});

const loginStack = createStackNavigator({
  login: { screen: Login },
  signup: {screen: Signup}
})

const unauthenticatedNav = createSwitchNavigator({
  loginStack: { screen: loginStack },
  drawerStack: { screen: drawerStack }
}, {
  initialRouteName: 'loginStack',
})

const authenticatedNav = createSwitchNavigator({
  loginStack: { screen: loginStack },
  drawerStack: { screen: drawerStack }
}, {
  initialRouteName: 'drawerStack',
})

const UnauthenticatedAppContainer = createAppContainer(unauthenticatedNav);
const AuthenticatedAppContainer = createAppContainer(authenticatedNav);

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      isAuthenticated: false,
    };

    // Initialize firebase database
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticated: !!user});
  }

  render() {
    return  (
      this.state.isAuthenticated ? <AuthenticatedAppContainer/> : <UnauthenticatedAppContainer/>
    );
  }
}