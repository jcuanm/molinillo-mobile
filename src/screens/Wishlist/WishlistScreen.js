import React, { Component } from 'react';
import { 
    View, 
    Text,
    Dimensions,
 } from 'react-native';
import styles from '../../styles';

export default class WishlistScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Wishlist",
    })
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
                    <Text>
                        Wishlist
                    </Text>
                </View>
            </View>
        );
    }
}