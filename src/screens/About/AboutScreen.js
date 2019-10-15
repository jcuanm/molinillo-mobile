import React, { Component } from 'react';
import { 
    Image,
    View, 
    ScrollView,
    Text
 } from 'react-native';
 import { Colors, OurStoryText } from '../../helpers/Constants';
 import { AboutScreenStyles } from './styles';
 
export default class AboutScreen extends Component {
    static navigationOptions = {
        headerTintColor: Colors.Secondary,
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        title: "Our Story",
    }

    render(){
        return(
            <ScrollView>
                <View style={AboutScreenStyles.containerStyles}>
                    <Image  
                        style={AboutScreenStyles.logoStyles}
                        source={require('../../../assets/images/logo_white.png')}
                    />
                </View>
                <Text style={AboutScreenStyles.ourStoryTextStyles}>
                    {OurStoryText}
                    {"\n"}
                    {"\n"}
                </Text> 
                <Text style={AboutScreenStyles.signatureTextStyles}>
                    – Javier Cuan-Martinez, Co-Founder
                </Text>
            </ScrollView>
        );
    }
}
