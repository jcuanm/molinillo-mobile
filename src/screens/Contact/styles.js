import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const ContactScreenStyles = StyleSheet.create({
    container: {
        alignItems:'center', 
        justifyContent:'center',
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height/3, 
        backgroundColor: Colors.Secondary,
    }, 
    logo: {
        width:120, 
        height: 180
    },
    text: {
        paddingRight: 20, 
        paddingLeft: 20
    },
    entry: {
        fontWeight: 'bold'
    }
});
