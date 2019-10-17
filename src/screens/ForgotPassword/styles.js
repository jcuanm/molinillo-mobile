import { StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const ForgotPasswordScreenStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Primary,
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    contentContainer: {
        alignItems: 'center'
    }
});

export const ForgotPasswordFormStyles = StyleSheet.create({
    container: {
        padding: 40,
        justifyContent:'center',
        alignItems: 'center'
    },
    contentContainer: {
        alignItems: 'center'
    },
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color: Colors.Secondary,
    },
    button: {
        width:300,
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
});

export const LogoStyles = StyleSheet.create({
    container : {
        alignItems: 'center'
    },
    logoText : {
        fontSize:36,
        color:Colors.Secondary,
    },
    logoImage: {
        width:80, 
        height: 140
    }
});
