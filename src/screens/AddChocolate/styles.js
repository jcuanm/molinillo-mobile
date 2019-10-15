import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const DataEntriesStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.Secondary,
    }, 
    scrollView: {
        flex: 1, 
        flexDirection: 'column'
    },
    submitButton: {
        padding: 10
    }
});

export const EntryStyles = StyleSheet.create({
    border: {
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey"
    }, 
    container: {
        justifyContent: 'center', 
        width: Dimensions.get('window').width, 
        height: 50, 
        backgroundColor: Colors.Secondary 
    },
    displayName: {
        textAlign: 'left', 
        paddingLeft: 10
    },
    value: {
        textAlign: 'right', 
        paddingLeft: 10
    },
    popupModal: {
        alignContent: 'center'
    },
    popupFlatlistContainer: {
        width: 300
    },
    popupEntriesBackground: {
        backgroundColor: Colors.Secondary, 
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey"
    },
    popupEntriesText: {
        textAlign:'center', 
        fontSize: 20
    }
});

export const ImageAreaStyles = StyleSheet.create({
    blankImageContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: Dimensions.get('window').width, 
        height: 150, 
        backgroundColor: 'rgba(0,0,0,.3)'
    }, 
    text: {
        fontSize: 25
    },
    image: {
        width: Dimensions.get('window').width, 
        height: 250
    }
});
