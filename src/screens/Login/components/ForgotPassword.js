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
      <View style={styles.forgotPasswordTextCont}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        <TouchableOpacity onPress={() => this.props.navigate("ForgotPasswordScreen")}>
          <Text style={styles.forgotPasswordButton}> Reset Password </Text>
        </TouchableOpacity>
      </View>	
		)
	}
}

const styles = StyleSheet.create({
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
