import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Text
} from 'react-native';

export default class Header extends Component {
	render() {
        const { producerName, confectionName } = this.props;
		return (
			<View style={{
                flexDirection: "row",
                paddingBottom: 10,
                backgroundColor:"white"
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent:"center",
                    paddingLeft: 25, 
                    fontSize:18
                }}>
                    <Text style={{fontWeight:'bold'}}> {producerName} </Text>
                    <Text> {confectionName} </Text>
                </View>
            </View>
		);
	}
}