import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import HomeTabs from '../screens/Home/HomeTabs';  
import LoginScreen from '../screens/Login/LoginScreen';  
import SignupScreen from '../screens/Signup/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen';

const authStack = createStackNavigator({
    LoginScreen: { screen: LoginScreen },
    SignupScreen: { screen: SignupScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
})

const unauthenticatedNav = createSwitchNavigator({
    AuthStack: { screen: authStack },
    HomeTabs: { screen: HomeTabs },
}, 
{
    initialRouteName: 'AuthStack',
})

export default class AuthNavigator extends Component {
    render() {
        const AuthNavigator = this.props.isAuthenticated ? 
            createAppContainer(HomeTabs) : createAppContainer(unauthenticatedNav);
        return ( <AuthNavigator /> );
    }
}