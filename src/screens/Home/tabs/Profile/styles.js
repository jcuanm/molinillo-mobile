import { StyleSheet } from 'react-native';
import { Colors } from '../../../../helpers/Constants';
import { Dimensions } from 'react-native';

export const ProfileScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.Secondary,
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerImage: {
        height:40, 
        width:40
    },
    welcomeTextWrapper: {
        justifyContent:"center", 
        width: Dimensions.get('window').width, 
        height: 100, 
        backgroundColor: Colors.Secondary
    },
    welcomeText: {
        fontSize:18, 
        textAlign:"center"
    },
    logoutButton: {
        padding:40
    }
});

export const ProfileNavTabStyles = StyleSheet.create({
    container: {
        justifyContent:'center', 
        width: Dimensions.get('window').width, 
        height: 50, 
        backgroundColor: Colors.Primary
    },
    text: {
        fontWeight:'bold', 
        color:"white", 
        paddingLeft:15
    }
});

export const ProfileOptionsStyles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    }
});
