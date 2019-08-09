import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Dimensions,
 } from 'react-native';
 import { Colors } from '../../../../../helpers/Constants';
 
export default class MyChocolates extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigationFunc("MyChocolatesScreen")}>
                <View style={{justifyContent:'center', width: Dimensions.get('window').width, height: 50, backgroundColor: Colors.Primary }}>
                    <Text style={{fontWeight:'bold', color:"white", paddingLeft:15}}>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
        );
    }
}