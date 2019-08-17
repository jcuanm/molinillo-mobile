import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    View, 
    ScrollView,
    Text
 } from 'react-native';
 import { Colors } from '../../helpers/Constants';
 
export default class ContactScreen extends Component {
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: "Contact Us",
    }

    render(){
        return(
            <ScrollView>
                <View 
                    style={{
                        alignItems:'center', 
                        justifyContent:'center',
                        width: Dimensions.get('window').width, 
                        height: Dimensions.get('window').height/3, 
                        backgroundColor: Colors.Secondary,
                    }}
                >
                    <Image  
                        style={{width:120, height: 180}}
                        source={require('../../../assets/images/logo_white.png')}
                    />
                </View>
                <View style={{paddingRight:20, paddingLeft: 20}}>
                    <Text style={{fontWeight:'bold'}}>Email:</Text>
                    <Text>
                        molinillomobile@gmail.com
                    </Text> 
                </View>
            </ScrollView>
        );
    }
}