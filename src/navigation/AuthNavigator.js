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
    LoginScreen: { screen: LoginScreen },
    SignupScreen: { screen: SignupScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
})

const unauthenticatedNav = createSwitchNavigator({
    AuthStack: { screen: authStack },
    DrawerStack: { screen: drawerStack },
}, 
{
    initialRouteName: 'AuthStack',
})

export default class AuthNavigator extends Component {
    render() {
        const AuthNavigator = this.props.isAuthenticated ? 
            createAppContainer(drawerStack) : createAppContainer(unauthenticatedNav);
        return ( <AuthNavigator /> );
    }
}