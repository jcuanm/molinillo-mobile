import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Text
} from 'react-native';

export default class Detail extends Component {
	render() {
		return (
			<View>
				<Text style={{fontSize:20, color:'rgba(0, 0, 0, .4)', textAlign:"right"}}> {this.props.producerName} </Text>
				<Text style={{fontSize:23, fontWeight:'bold'}}> {this.props.confectionName} </Text>
				<Text style={{fontSize:23, fontWeight:'bold'}}> {this.props.confectionName} </Text>
			</View>
		);
	}
}