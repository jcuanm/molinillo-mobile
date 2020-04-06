import React, { Component } from 'react';
import { 
    Linking,
    TouchableOpacity,
    View, 
    Text
 } from 'react-native';
 import { ProfileNavTabStyles } from '../styles';
 
export default class PolicyPolicy extends Component {

    render(){
        return(
            <TouchableOpacity onPress={() => this.openWebpage(this.props.url)}>
                <View style={ProfileNavTabStyles.container}>
                    <Text style={ProfileNavTabStyles.text}>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
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