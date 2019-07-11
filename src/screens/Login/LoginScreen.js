import React, { Component } from 'react';
import { View } from 'react-native';
import Logo from './components/Logo';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import { LoginScreenStyles } from './styles';

export default class LoginScreen extends Component {
	render() {
		return(
			<View style={LoginScreenStyles.container}>
				<Logo/>
				<LoginForm/>
				<Signup navigate={this.props.navigation.navigate}/>
        		<ForgotPassword navigate={this.props.navigation.navigate}/>
			</View>	
		);
	}
}
