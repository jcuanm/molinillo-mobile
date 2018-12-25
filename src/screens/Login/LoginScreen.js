import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Logo from './components/Logo';
import LoginForm from './components/LoginForm';

export default class LoginScreen extends Component {

	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<LoginForm/>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate("signup")}>
            <Text style={styles.signupButton}> Signup </Text>
          </TouchableOpacity>
				</View>
        <View style={styles.forgotPasswordTextCont}>
					<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate("forgotPassword")}>
            <Text style={styles.forgotPasswordButton}> Reset Password </Text>
          </TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  forgotPasswordTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  forgotPasswordText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  forgotPasswordButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});
