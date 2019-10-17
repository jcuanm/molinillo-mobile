import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import Logo from './components/Logo';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { ForgotPasswordScreenStyles } from './styles';

export default class ForgotPasswordScreen extends Component{
  
	render() {
		return(
      <KeyboardAvoidingView 
        style={ForgotPasswordScreenStyles.container}
				behavior="position" 
				contentContainerStyle={ForgotPasswordScreenStyles.contentContainer}
				enabled
			>
				<Logo/>
				<ForgotPasswordForm navigate={this.props.navigation.popToTop} />
			</KeyboardAvoidingView>	
		);
	}
}
