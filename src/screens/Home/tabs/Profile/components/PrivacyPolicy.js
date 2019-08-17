import React, { Component } from 'react';
import { 
    Dimensions,
    Linking,
    TouchableOpacity,
    View, 
    Text
 } from 'react-native';
 import { PrivacyPolicyUrl } from '../../../../../helpers/Constants';
 import { Colors } from '../../../../../helpers/Constants';
 
export default class PrivacyPolicy extends Component {

    render(){
        return(
            <TouchableOpacity onPress={() => this.openWebpage(PrivacyPolicyUrl)}>
                <View style={{justifyContent:'center', width: Dimensions.get('window').width, height: 50, backgroundColor: Colors.Primary }}>
                    <Text style={{fontWeight:'bold', color:"white", paddingLeft:15}}>{this.props.title}</Text> 
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