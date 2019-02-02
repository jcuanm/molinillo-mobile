import React from 'react'
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
  }
});

const authStack = createStackNavigator({
  login: { screen: LoginScreen },
  signup: {screen: SignupScreen},
  forgotPassword: {screen: ForgotPasswordScreen}
})

const scanningStack = createStackNavigator({
  scanner: { screen: ScannerScreen },
  addChocolate: {screen: AddChocolateScreen}
})

const unauthenticatedNav = createSwitchNavigator({
  authStack: { screen: authStack },
  drawerStack: { screen: drawerStack },
  scanningStack: {screen: scanningStack}
}, {
  initialRouteName: 'authStack',
})

export default UnauthenticatedNavigator = createAppContainer(unauthenticatedNav);