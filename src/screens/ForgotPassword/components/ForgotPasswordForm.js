import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  Platform
} from 'react-native';
import * as firebase from 'firebase';
import { ForgotPasswordFormStyles } from '../styles';
import { Colors } from '../../../helpers/Constants';

export default class ForgotPasswordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
    }
  }

  onResetPasswordPress = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
          this.props.navigate();
          alert("An email allowing you to reset your password has been sent.");
      }, (error) => {
          alert(error.message);
      });
  }

	render(){
		return(
			<View style={ForgotPasswordFormStyles.container}>
        <TextInput
          maxLength={255} 
          clearButtonMode={"always"}
          style={ForgotPasswordFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder="Email"
          placeholderTextColor = {Colors.Secondary}
          selectionColor="#fff"
          keyboardType="email-address"
        />
        
        <Button 
          style={ForgotPasswordFormStyles.button} 
          color={Platform.OS === 'ios' ? Colors.Secondary : 'rgba(255, 255,255,0.2)'} 
          title="Reset Password" 
          onPress={this.onResetPasswordPress} 
        />
  		</View>
		);
	}
}
