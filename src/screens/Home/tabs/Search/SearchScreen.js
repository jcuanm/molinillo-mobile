import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import styles from '../../../../styles';

export default class Search extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Search",
        headerLeft: (
            <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </TouchableOpacity>
        ),
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>Search</Text>
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}