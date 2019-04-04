import React, { Component } from 'react';
import { View } from 'react-native';
import './components/Detail';
import styles from '../../styles';
import Detail from './components/Detail';

export default class DetailScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Chocolate Details",
	})

	render() {
		const { navigation } = this.props;
		const results = navigation.getParam('results', 'none');
		return (
			<View style={styles.container}>
				<Detail title={results['confectionName']} />
				<Detail title={results['brand']} />
				<Detail title={results['type']} />
			</View>
		);
	}
}