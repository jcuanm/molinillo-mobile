import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Text
} from 'react-native';
import styles from '../../styles';

export default class DetailScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Chocolate Details",
	})

	render() {
		const { navigation } = this.props;
		const results = navigation.getParam('results', 'none');
		return (
			<View style={styles.container}>
			<View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
				<Text>
				{results['Confection Name']}
				</Text>
			</View>
			<View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
				<Text>
				{results['Brand']}
				</Text>
			</View>
			<View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
				<Text>
				{results['Type']}
				</Text>
			</View>
			</View>
		);
	}
}