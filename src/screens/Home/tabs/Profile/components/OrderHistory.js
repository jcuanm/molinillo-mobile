import React, { Component } from 'react';
import { 
    TouchableOpacity,
    View, 
    Text
 } from 'react-native';
 import { ProfileNavTabStyles } from '../styles';

export default class OrderHistory extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigationFunc("OrderHistoryScreen")}>
                <View style={ProfileNavTabStyles.container}>
                    <Text style={ProfileNavTabStyles.text}>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
        );
    }
}
