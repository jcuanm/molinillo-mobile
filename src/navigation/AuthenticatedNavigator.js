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

const authStack = createStackNavigator({
  login: { screen: LoginScreen },
  signup: {screen: SignupScreen}
})

const scanningStack = createStackNavigator({
  ScannerScreen: { screen: ScannerScreen },
  AddChocolateScreen: {screen: AddChocolateScreen}
})

const authenticatedNav = createSwitchNavigator({
  authStack: { screen: authStack },
  drawerStack: { screen: drawerStack },
  scanningStack: {screen: scanningStack}
}, {
  initialRouteName: 'drawerStack',
})

export default AuthenticatedNavigator = createAppContainer(authenticatedNav);