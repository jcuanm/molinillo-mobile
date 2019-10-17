import React, { Component } from 'react';
import {
  Text,
  View,
  Image 
} from 'react-native';
import { LogoStyles } from '../styles';

export default class Logo extends Component {
	render(){
		return(
			<View style={LogoStyles.container}>
				<Image  
					style={LogoStyles.logoImage}
          			source={require('../../../../assets/images/logo.png')}
				/>
          		<Text style={LogoStyles.logoText}>Molinillo</Text>	
  			</View>
		);
	}
}
