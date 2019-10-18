import { StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const SignupScreenStyles = StyleSheet.create({
    container : {
        backgroundColor: Colors.Primary,
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center'
    },
    contentContainerStyle: {
        alignItems: 'center'
    }
});

export const LogoStyles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'flex-end',
        alignItems: 'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize:40,
        color: Colors.Secondary
    },
    image: {
        width:80, 
        height: 140 
    }
});

export const SigninStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent : 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    text: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    button: {
        color: Colors.Secondary,
        fontSize: 16,
        fontWeight: '500'
    }
});

export const SignupFormStyles = StyleSheet.create({
    container: {
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
        color: Colors.Secondary,
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
        color: Colors.Secondary,
        textAlign:'center'
    },
    privacyPolicyLink: {
        fontWeight:"bold", 
        color: Colors.Secondary
    },
    privacyPolicyText: {
        color:'rgba(255, 255, 255, .7)', 
        textAlign: "center", 
        padding:10
    }
});
