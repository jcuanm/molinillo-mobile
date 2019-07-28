import React, { Component } from 'react';
import { SignupStyles } from '../styles';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Signup extends Component {
	render() {
		return(
      <View style={SignupStyles.textContent}>
        <Text style={SignupStyles.text}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => this.props.navigate("SignupScreen")}>
          <Text style={SignupStyles.button}> Sign up </Text>
        </TouchableOpacity>
      </View>
		);
	}
}
