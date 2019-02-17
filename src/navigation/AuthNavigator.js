import React, { Component } from 'react';
import {
  createAppContainer,
  createDrawerNavigator, 
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
import HomeTabs from '../screens/Home/HomeTabs';  
import LoginScreen from '../screens/Login/LoginScreen';  
import SignupScreen from '../screens/Signup/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ScannerScreen from '../screens/Scanner/ScannerScreen';
import AddChocolateScreen from '../screens/AddChocolate/AddChocolateScreen';

const drawerStack = createDrawerNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ( <MaterialCommunityIcons name="home" size={27} color="green" />),
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ( <MaterialCommunityIcons name="settings" size={27} color="green" /> ),
    }
  },
});

const unauthStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignupScreen: { screen: SignupScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen }
})

const authStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignupScreen: { screen: SignupScreen },
})

const scanningStack = createStackNavigator({
  ScannerScreen: { screen: ScannerScreen },
  AddChocolateScreen: { screen: AddChocolateScreen }
})

const authenticatedNav = createSwitchNavigator({
  authStack: { screen: authStack },
  drawerStack: { screen: drawerStack },
  scanningStack: { screen: scanningStack }
}, {
  initialRouteName: 'drawerStack',
})

const unauthenticatedNav = createSwitchNavigator({
  authStack: { screen: unauthStack },
  drawerStack: { screen: drawerStack },
  scanningStack: {screen: scanningStack}
}, {
  initialRouteName: 'authStack',
})

export default class AuthNavigator extends Component {
  render() {
    const AuthNavigator = this.props.isAuthenticated ? createAppContainer(authenticatedNav) : createAppContainer(unauthenticatedNav);
    return ( <AuthNavigator /> );
  }
}