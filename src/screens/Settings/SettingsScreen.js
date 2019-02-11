import React, { Component } from 'react';
import {
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import * as firebase from 'firebase';

export default class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerLeft: (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="md-checkmark-circle" size={32} color="purple" />
      </TouchableOpacity>
    ),
  })

	render() {
		return(
      <View styles={styles.container}>
        <Button
          title="Logout"
          onPress={() => {console.log("Props", this.props); firebase.auth().signOut()}} 
          styles={styles.button}
        />
      </View>
		);
	}
}