import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const AboutScreenStyles = StyleSheet.create({
    containerStyles:{
        alignItems:'center', 
        justifyContent:'center', 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height/3, 
        backgroundColor: Colors.Secondary
    }, 
    logoStyles: {
        width:120, 
        height: 180
    },
    ourStoryTextStyles: {
        paddingRight: 20, 
        paddingLeft: 20
    },
    signatureTextStyles: {
        paddingRight: 20, 
        paddingLeft: 20,
        fontStyle:"italic"
    }
});
