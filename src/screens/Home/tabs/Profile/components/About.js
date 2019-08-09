import React, { Component } from 'react';
import { 
    Dimensions,
    TouchableOpacity,
    View, 
    Text
 } from 'react-native';
 import { Colors } from '../../../../../helpers/Constants';
 
export default class About extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigationFunc("AboutScreen")}>
                <View style={{justifyContent:'center', width: Dimensions.get('window').width, height: 50, backgroundColor: Colors.Primary }}>
                    <Text style={{fontWeight:'bold', color:"white", paddingLeft:15}}>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
        );
    }
}