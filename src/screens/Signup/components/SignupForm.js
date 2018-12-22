import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';
import * as firebase from 'firebase';

export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
    }
  }

  onSignupPress = () => {
    if(this.state.password !== this.state.passwordConfirm){
      alert("Passwords do not match");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => { }), (error) => { alert(error.message); }
  }

	render(){
		return(
			<View style={styles.container}>
        <TextInput style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput 
          style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ password: text }) }}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
        />  
        <TextInput 
          style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
        />  
        
        <Button style={styles.button} title="Signup" onPress={this.onSignupPress} />
  		</View>
		)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});