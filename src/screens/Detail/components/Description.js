import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DescriptionStyles } from '../styles';

export default class Description extends Component {
	render() {
        const { text } = this.props;
		return (
			<View style={DescriptionStyles.container}>
                <Text>
                    {text}
                </Text>
            </View>
		);
	}
}
