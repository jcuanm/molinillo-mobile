import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from './components/Logo';
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordForm from './components/ForgotPasswordForm';

export default class ForgotPasswordScreen extends Component{
	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<ForgotPasswordForm/>
        <ForgotPassword 
          forgotPasswordText={"Forgot Password"}
          resetPasswordButtonText={"Reset Password"}
        />
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
