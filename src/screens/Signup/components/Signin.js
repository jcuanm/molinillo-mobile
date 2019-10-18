import React, { Component } from 'react';
import {
  StyleSheet,
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

const styles = StyleSheet.create({
  textContent : {
  	flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent : 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  text: {
  	color: 'rgba(255,255,255,0.6)',
  	fontSize: 16
  },
  button: {
  	color: '#ffffff',
  	fontSize: 16,
  	fontWeight: '500'
  }
});

