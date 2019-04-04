import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Text
} from 'react-native';

export default class Detail extends Component {
	render() {
		return (
      <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
        <Text>
          {this.props.title}
        </Text>
      </View>
		);
	}
}