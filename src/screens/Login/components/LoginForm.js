import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  Platform
} from 'react-native';
import DbHandler from '../../../helpers/DbHandler';
import { LoginFormStyles } from '../styles'; 

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.dbHandler = new DbHandler();
    this.state = {
      email: "",
      password: "",
    }
  }

	render(){
		return(
			<View style={LoginFormStyles.container}>
        <TextInput style={LoginFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={()=> this.password.focus()}
        />
        <TextInput 
          style={LoginFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({password: text}) }}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
        />  

        <Button 
          title="Login"
          color={Platform.OS === 'ios' ? 'white' : 'rgba(255, 255,255,0.2)'} 
          onPress={() => this.dbHandler.loginUser(this.state.email, this.state.password)} 
        />
  		</View>
		);
	}
}
