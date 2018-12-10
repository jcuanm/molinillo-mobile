import React from 'react'
import {
  createAppContainer,
  createDrawerNavigator, 
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import Home from './Home';  // Tab Nav
import Login from './Login/pages/Login';  
import Signup from './Login/pages/Signup';  

const drawerStack = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (<MaterialCommunityIcons name="home" size={27} color="green" />),
    }
  },
});

const loginStack = createStackNavigator({
  login: { screen: Login },
  signup: {screen: Signup}
})

const primaryNav = createSwitchNavigator({
  loginStack: { screen: loginStack },
  drawerStack: { screen: drawerStack }
}, {
  initialRouteName: 'loginStack',
})

export default createAppContainer(primaryNav);