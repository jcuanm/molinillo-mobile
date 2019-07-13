import React, { Component } from 'react';
import {
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../styles';
import { Colors } from '../../../../helpers/Constants';
import * as firebase from 'firebase';

export default class SettingsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerStyle: {
      backgroundColor: Colors.Primary,
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerLeft: (
      <TouchableOpacity style={styles.headerButton} >
        <Ionicons name="md-checkmark-circle" size={32} color="purple" />
      </TouchableOpacity>
    ),
  })

	render() {
		return(
      <View style={{flex:1}}>
        <Button
          title="Logout"
          onPress={() => { firebase.auth().signOut(); } } 
          styles={styles.button}
        />
                
        <ActionButton
          buttonColor={Colors.Primary}
          icon={<Ionicons name="md-camera" size={25} color="white" />}
          onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
        />
      </View>
		);
	}
}