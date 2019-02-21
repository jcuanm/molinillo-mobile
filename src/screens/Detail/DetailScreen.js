import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text
} from 'react-native';
import styles from '../../styles';

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Chocolates",
  })

  render() {
    const { navigation } = this.props;
    const results = navigation.getParam('results', 'none');
    console.log("Results in DetailView", results);
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