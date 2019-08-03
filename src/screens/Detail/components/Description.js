import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Description extends Component {
	render() {
        const { text } = this.props;
		return (
			<View style={{ fontSize: 12, paddingLeft: 30, paddingRight: 25, paddingBottom:10}}>
                <Text>
                    {text}
                </Text>
            </View>
		);
	}
}
