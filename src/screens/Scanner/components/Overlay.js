import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';

export default class Overlay extends Component {
    render(){
        return(
            <View>
                <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                <View style={styles.layerLeft} />
                <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} >
                    <Text style={{ color: 'white', fontSize: 25 }}> {this.props.userText} </Text>
                </View>
            </View>
        );
    }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: opacity
  },
});
