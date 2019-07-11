import React, { Component } from 'react';
import { View } from 'react-native';
import Logo from './components/Logo';
import SignupForm from './components/SignupForm';
import Signin from './components/Signin';
import { SignupScreenStyles } from './styles';

export default class SignupScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Sign-Up",
  })

	render() {
		return(
			<View style={SignupScreenStyles.container}>
				<Logo/>
				<SignupForm/>
				<Signin/>
			</View>	
		);
	}
}
