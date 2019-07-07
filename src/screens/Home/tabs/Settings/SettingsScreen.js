import React, { Component } from 'react';
import {
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../styles/index';
import * as firebase from 'firebase';

export default class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerLeft: (
      <TouchableOpacity style={styles.headerButton} >
        <Ionicons name="md-checkmark-circle" size={32} color="purple" />
      </TouchableOpacity>
    ),
  })

	render() {
		return(
      <View styles={styles.container}>
        <Button
          title="Logout"
          onPress={() => { firebase.auth().signOut(); } } 
          styles={styles.button}
        />
      </View>
		);
	}
}