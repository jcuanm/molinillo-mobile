import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Logo from './components/Logo';
import SignupForm from './components/SignupForm';
import Signin from './components/Signin';

export default class SignupScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Sign-Up",
  })

	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<SignupForm/>
				<Signin/>
			</View>	
		);
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent : 'center'
  },
});
