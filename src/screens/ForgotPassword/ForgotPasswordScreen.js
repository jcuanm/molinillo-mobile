import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../../helpers/Constants';
import Logo from './components/Logo';
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordForm from './components/ForgotPasswordForm';

export default class ForgotPasswordScreen extends Component{
  
	render() {
		return(
      <KeyboardAvoidingView 
        style={styles.container}
				behavior="position" 
				contentContainerStyle={{ alignItems: 'center' }}
				enabled
			>
				<Logo/>
				<ForgotPasswordForm navigate={this.props.navigation.popToTop} />
        <ForgotPassword />
			</KeyboardAvoidingView>	
		);
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: Colors.Primary,
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
