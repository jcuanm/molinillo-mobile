import { Dimensions, StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import { Colors } from '../../helpers/Constants';
const opacity = 'rgba(0, 0, 0, .6)';

export const ScannerScreenStyles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Header.HEIGHT,
    },
    permissionText: {
        fontWeight:'bold', 
        textAlign:'center'
    },
    overlayTop: {
        flex: 2,
        backgroundColor: opacity
    },
    overlayCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    overlayLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    overlayFocused: {
        flex: 10
    },
    overlayRight: {
        flex: 1,
        backgroundColor: opacity
    },
    overlayBottom: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: opacity
    },
    overlayText: {
        color: Colors.Secondary, 
        fontSize: 25
    }
});
