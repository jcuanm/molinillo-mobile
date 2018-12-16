import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
} from 'react-native';
import * as firebase from 'firebase';


export default class Settings extends Component {

	render() {
		return(
            <View styles={styles.container}>
                <Button
                    title="Logout"
                    onPress={() => firebase.auth().signOut()}
                    styles={styles.button}
                />
            </View>
		)
	}
}

const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
  
    inputBox: {
      width:300,
      backgroundColor:'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#ffffff',
      marginVertical: 10
    },
    button: {
      width:300,
      backgroundColor:'#1c313a',
       borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    }
    
  });