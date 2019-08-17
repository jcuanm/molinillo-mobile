import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Linking,
  TextInput,
  Text,
  Button,
  Platform
} from 'react-native';
import { PrivacyPolicyUrl } from '../../../helpers/Constants';
import DbHandler from '../../../helpers/DbHandler';

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
			<View style={styles.container}>
        <TextInput style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
        />
        <TextInput style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          onChangeText={(text) => { this.setState({ displayName: text }) }}
          placeholder="Display Name"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
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
        
        <Button 
          style={styles.button} 
          title="Signup"
          color={Platform.OS === 'ios' ? 'white' : 'rgba(255, 255,255,0.2)'}  
          onPress={() => this.dbHandler.signupUser({
              email : this.state.email, 
              displayName : this.state.displayName,
              password : this.state.password, 
              passwordConfirm : this.state.passwordConfirm
            })} 
        />

        <Text onPress={() => this.openWebpage(PrivacyPolicyUrl)} style={{color:'rgba(255, 255, 255, .7)', textAlign: "center", padding:10}}>  
          By pressing Signup, you agree to our <Text style={{fontWeight:"bold", color:'rgba(255, 255, 255, 1)'}}>privacy policy</Text>
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