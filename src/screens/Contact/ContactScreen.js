import React, { Component } from 'react';
import { 
    Image,
    View, 
    ScrollView,
    Text
 } from 'react-native';
 import { Colors } from '../../helpers/Constants';
 import { ContactScreenStyles } from './styles';
 
export default class ContactScreen extends Component {
    static navigationOptions = {
        headerTintColor: Colors.Secondary,
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        title: "Contact Us",
    }

    render(){
        return(
            <ScrollView>
                <View 
                    style={ContactScreenStyles.container}
                >
                    <Image  
                        style={ContactScreenStyles.logo}
                        source={require('../../../assets/images/logo_white.png')}
                    />
                </View>
                <View style={ContactScreenStyles.text}>
                    <Text style={ContactScreenStyles.entry}>Email:</Text>
                    <Text>
                        molinillomobile@gmail.com
                    </Text> 
                </View>
            </ScrollView>
        );
    }
}