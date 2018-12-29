import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Dimensions,
 } from 'react-native';
 
export default class Option extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigationFunc(this.props.navigateScreen)}>
                <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'powderblue'}}>
                    <Text>{this.props.title}</Text> 
                </View>
            </TouchableOpacity>   
        );
    }
}