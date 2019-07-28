import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { ForgotPasswordStyles } from '../styles';

export default class ForgotPassword extends Component {
	render() {
		return(
      <View style={ForgotPasswordStyles.forgotPasswordTextCont}>
        <Text style={ForgotPasswordStyles.forgotPasswordText}>Forgot password?</Text>
        <TouchableOpacity onPress={() => this.props.navigate("ForgotPasswordScreen")}>
          <Text style={ForgotPasswordStyles.forgotPasswordButton}> Reset password </Text>
        </TouchableOpacity>
      </View>	
		)
	}
}
