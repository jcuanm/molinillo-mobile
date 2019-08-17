import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import Logo from './components/Logo';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import { LoginScreenStyles } from './styles';

export default class LoginScreen extends Component {
	render() {
		return(
			<KeyboardAvoidingView 
				style={LoginScreenStyles.container}
				behavior="position" 
				contentContainerStyle={{ alignItems: 'center' }}
				enabled
			>
				<Logo/>
				<LoginForm/>
        		<ForgotPassword navigate={this.props.navigation.navigate}/>
				<Signup navigate={this.props.navigation.navigate}/>
			</KeyboardAvoidingView>
		);
	}
}
