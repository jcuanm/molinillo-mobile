import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class ForgotPassword extends Component {
	render() {
		return(
      <View style={styles.forgotPasswordTextContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>
            <Text style={styles.forgotPasswordButton}></Text>
          </Text>
        </TouchableOpacity>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  forgotPasswordTextContainer : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row',
    paddingRight:3
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
