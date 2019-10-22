import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { LogoStyles } from '../styles';

export default class Signin extends Component {
	render() {
		return(
      <View style={LogoStyles.container}>
        <Text style={LogoStyles.text}></Text>
        <TouchableOpacity >
          <Text style={LogoStyles.button}></Text>
        </TouchableOpacity>
      </View>
		);
	}
}
