import React, { Component } from 'react';
import {
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import * as firebase from 'firebase';

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Chocolates",
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
          <Text>
            Detail Screen
          </Text>
        </View>
      </View>
    );
  }
}