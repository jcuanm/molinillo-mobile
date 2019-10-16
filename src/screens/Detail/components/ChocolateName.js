import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ChocolateNameStyles } from '../styles';

export default class ChocolateName extends Component {
	render() {
        const { producerName, confectionName } = this.props;
		return (
			<View style={ChocolateNameStyles.container}>
                <View style={ChocolateNameStyles.chocolateNameBlock}>
                    <Text> 
                        <Text style={ChocolateNameStyles.producerName}>{producerName}</Text>{"\n"}
                        {confectionName} 
                    </Text>
                </View>
            </View>
		);
	}
}
