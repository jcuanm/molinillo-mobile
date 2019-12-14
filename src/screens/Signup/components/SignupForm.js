import React, { Component } from 'react';
import {
  View,
  Linking,
  TextInput,
  Text,
  Button,
  Platform
} from 'react-native';
import { Colors, PrivacyPolicyUrl } from '../../../helpers/Constants';
import DbHandler from '../../../helpers/DbHandler';
import { SignupFormStyles } from '../styles';


export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.dbHandler = new DbHandler();
    this.state = {
      email: "",
      displayName: "",
      password: "",
      passwordConfirm: "",
    };
  }

	render(){
		return(
			<View style={SignupFormStyles.container}>
        <TextInput 
          maxLength={255}
          clearButtonMode={"always"}
          style={SignupFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
        />
        <TextInput 
          maxLength={255}
          clearButtonMode={"always"}
          style={SignupFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ displayName: text }) }}
          placeholder="Display Name"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
        />
        <TextInput 
          maxLength={255}
          clearButtonMode={"always"}
          style={SignupFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ password: text }) }}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
        />  
        <TextInput 
          maxLength={255}
          clearButtonMode={"always"}
          style={SignupFormStyles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
        />  
        
        <Button 
          style={SignupFormStyles.button} 
          title="Signup"
          color={Platform.OS === 'ios' ? Colors.Secondary : 'rgba(255, 255,255,0.2)'}  
          onPress={() => this.dbHandler.signupUser({
            email : this.state.email, 
            displayName : this.state.displayName,
            password : this.state.password, 
            passwordConfirm : this.state.passwordConfirm
          })} 
        />

        <Text onPress={() => this.openWebpage(PrivacyPolicyUrl)} style={SignupFormStyles.privacyPolicyText}>  
          By pressing Signup, you agree to our <Text style={SignupFormStyles.privacyPolicyLink}>privacy policy</Text>
        </Text>
  		</View>
		);
  }
  
  openWebpage(url){
		if(url){
			Linking
				.canOpenURL(url)
				.then(supported =>{
					if(supported){
						Linking.openURL(url);
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}
