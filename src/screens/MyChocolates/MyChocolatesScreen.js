import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Dimensions,
 } from 'react-native';
import styles from '../../styles';
import { SearchBar } from 'react-native-elements'

export default class MyChocolatesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "My Chocolates",
    })
    
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    onChangeText={() => console.log("Typeing...")}
                    onClear={() => console.log("Cleared...")}
                    placeholder='Type Here...' 
                    clearIcon={{name: 'clear'}}
                />

                <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
                    <Text>
                        My Chocolates
                    </Text>
                </View>
            </View>
        );
    }
}