import React, { Component } from 'react';
import { 
    Button,
    Image,
    View, 
    Text, 
    TouchableOpacity,
    Dimensions,
 } from 'react-native';
import ActionButton from 'react-native-action-button';
import styles from '../../../../styles';
import ProfileOptions from './components/ProfileOptions';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../../helpers/Constants';
import * as firebase from 'firebase';

export default class ProfileScreen extends Component {

    static navigationOptions = {
        title: "Profile",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
        color: 'white'
        },
        headerLeft: (
            <TouchableOpacity style={styles.headerButton} >
                <Image 
                    style={{height:40, width:40}}
                    source={require('../../../../../assets/images/logo.png')}
                />
            </TouchableOpacity>
        ),
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent:"center", width: Dimensions.get('window').width, height: 100, backgroundColor: Colors.Secondary}}>
                    <Text style={{fontSize:18, textAlign:"center"}}>
                        Welcome, {firebase.auth().currentUser.displayName}
                    </Text>
                </View>

                <ProfileOptions navigationFunc={this.props.navigation.navigate}/>

                <View style={{padding:40}}>
                    <Button
                        title="Logout"
                        onPress={() => { firebase.auth().signOut(); } } 
                        color="red"
                    />  
                </View>
                
                <ActionButton
                    buttonColor={Colors.Primary}
                    icon={<Ionicons name="md-camera" size={25} color="white" />}
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}