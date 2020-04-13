import React, { Component } from 'react';
import { 
    TouchableOpacity,
    View, 
    Text
 } from 'react-native';
 import { ProfileNavTabStyles } from '../styles';

export default class MyOrders extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigationFunc("MyOrdersScreen")}>
                <View style={ProfileNavTabStyles.container}>
                    <Text style={ProfileNavTabStyles.text}>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
        );
    }
}
