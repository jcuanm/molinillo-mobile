import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Logo from './components/Logo';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

export default class LoginScreen extends Component {
	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<LoginForm/>
				<Signup navigate={this.props.navigation.navigate}/>
        <ForgotPassword/>
			</View>	
		);
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
});
