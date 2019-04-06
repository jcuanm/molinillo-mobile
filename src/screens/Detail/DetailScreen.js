import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import './components/Detail';
import styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import Detail from './components/Detail';

export default class DetailScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Chocolate Details",
		headerLeft: (
			<TouchableOpacity style={styles.headerButton}>
				<Ionicons name="md-arrow-back" size={32} onPress={() => navigation.popToTop()} size={35} color="black" />
			</TouchableOpacity>
		),		
	})

	render() {
		const { navigation } = this.props;
		const results = navigation.getParam('results', 'none');
		return (
			<View style={styles.container}>
				<Detail title={results.confectionName} />
				<Detail title={results.brand} />
				<Detail title={results.type} />
			</View>
		);
	}
}