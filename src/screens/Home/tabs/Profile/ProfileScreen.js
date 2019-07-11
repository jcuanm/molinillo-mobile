import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Dimensions,
 } from 'react-native';
import ActionButton from 'react-native-action-button';
import styles from '../../../../styles';
import ProfileOptions from './components/ProfileOptions';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class ProfileScreen extends Component {

    static navigationOptions = {
        title: "Profile",
        headerLeft: (
            <TouchableOpacity style={styles.headerButton} >
                <Ionicons name="md-checkmark-circle" size={32} color="purple" />
            </TouchableOpacity>
        ),
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'steelblue'}}>
                    <Text>
                        Welcome {firebase.auth().currentUser.email}
                    </Text>
                </View>

                <ProfileOptions navigationFunc={this.props.navigation.navigate}/>
                
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}