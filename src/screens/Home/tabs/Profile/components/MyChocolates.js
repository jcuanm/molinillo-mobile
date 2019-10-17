import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
 } from 'react-native';
 import { ProfileNavTabStyles } from '../styles';
 
export default class MyChocolates extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigationFunc("MyChocolatesScreen")}>
                <View style={ProfileNavTabStyles.container}>
                    <Text style={ProfileNavTabStyles.text}>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
        );
    }
}
