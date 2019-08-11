import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    View, 
    ScrollView,
    Text
 } from 'react-native';
 import { Colors, OurStoryText } from '../../helpers/Constants';
 
export default class AboutScreen extends Component {
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: "Our Story",
    }

    render(){
        return(
            <ScrollView>
                <View style={{alignItems:'center', justifyContent:'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height/3, backgroundColor: Colors.Secondary }}>
                    <Image  
                        style={{width:120, height: 180}}
                        source={require('../../../assets/images/logo_white.png')}
                    />
                </View>
                <Text style={{paddingRight:20, paddingLeft: 20 }}>
                    {OurStoryText}
                    {"\n"}
                    {"\n"}
                </Text> 
                <Text style={{fontStyle:"italic", paddingRight:20, paddingLeft: 20}}>
                    – Javier Cuan-Martinez, Co-Founder
                </Text>
            </ScrollView>
        );
    }
}