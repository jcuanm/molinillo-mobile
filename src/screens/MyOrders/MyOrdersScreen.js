import React, { Component } from 'react';
import { 
    Image,
    View, 
    ScrollView,
    Text
 } from 'react-native';
 import { Colors, OurStoryText } from '../../helpers/Constants';
 import { AboutScreenStyles } from './styles';
 
export default class MyOrdersScreen extends Component {
    static navigationOptions = {
        headerTintColor: Colors.Secondary,
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        title: "My Orders",
    }

    render(){
        return(
            <ScrollView>
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