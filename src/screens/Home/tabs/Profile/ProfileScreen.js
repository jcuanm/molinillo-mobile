import React, { Component } from 'react';
import { 
    Button,
    Image,
    View, 
    Text, 
    TouchableOpacity,
 } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ProfileScreenStyles } from './styles';
import ProfileOptions from './components/ProfileOptions';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../../helpers/Constants';
import * as firebase from 'firebase';


export default class ProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Profile",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity
                onPress={() => navigation.navigate("SearchScreen")} 
                style={ProfileScreenStyles.headerButton} 
            >
                <Image 
                    style={ProfileScreenStyles.headerImage}
                    source={require('../../../../../assets/images/logo.png')}
                />
            </TouchableOpacity>
        ),
    })
    
    render(){
        return (
            <View style={ProfileScreenStyles.container}>
                <View style={ProfileScreenStyles.welcomeTextWrapper}>
                    <Text style={ProfileScreenStyles.welcomeText}>
                        Welcome, {firebase.auth().currentUser.displayName}
                    </Text>
                </View>

                <ProfileOptions navigationFunc={this.props.navigation.navigate}/>

                <View style={ProfileScreenStyles.logoutButton}>
                    <Button
                        title="Logout"
                        onPress={() => { firebase.auth().signOut(); } } 
                        color="red"
                    />  
                </View>
                
                <ActionButton
                    buttonColor={Colors.Primary}
                    icon={<Ionicons name="md-camera" size={25} color={Colors.Secondary} />}
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}
