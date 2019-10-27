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


const imageAreaHeight = Dimensions.get('window').height/3;
export const EntryStyles = StyleSheet.create({
    border: {
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey"
    }, 
    container: {
        justifyContent: 'center', 
        width: Dimensions.get('window').width, 
        backgroundColor: Colors.Secondary 
    },
    displayName: {
        textAlign: 'left', 
        paddingLeft: 10,
        fontWeight:'bold',
        fontSize:15
    },
    displayValue: {
        textAlign: 'left', 
        paddingLeft: 10
    },
    value: {
        textAlign: 'right', 
        paddingLeft: 10
    },
    popupModal: {
        alignContent: 'center',
        alignSelf:"center"
    },
    popupFlatlistContainer: {
        width: 300
    },
    popupTextInputContainer: {
        backgroundColor:Colors.Primary, 
        width: 330, 
        height: 190, 
        alignContent:"center", 
        justifyContent:"center"
    },
    popupTextInputTitle: {
        margin:5, 
        fontSize: 14, 
        fontWeight:"bold",
        flex:1,
        justifyContent:"flex-start",
        color:"white"
    },
    popupTextInputArea: {
        backgroundColor:"white", 
        marginLeft:5, 
        height: 120, 
        width:320, 
        borderColor: 'gray', 
        borderWidth: 1
    },
    popupInputTextButton: {
        backgroundColor:"white", 
        justifyContent: 'center', 
        height: 30, 
        width:155, 
        margin: 5
    },
    popupCancelButtonText: {
        textAlign:"center", 
        color: "red"
    },
    popupSubmitButtonText: {
        textAlign:"center", 
        color: Colors.Primary
    },
    popupSubmitButton: {
        backgroundColor:"white", 
        justifyContent: 'center', 
        height: 30, 
        width:155, 
        margin: 5
    },
    popupButtonContainer: {
        flexDirection:"row"
    },
    popupEntriesBackground: {
        backgroundColor: Colors.Secondary, 
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey"
    },
    popupEntriesText: {
        textAlign:'center', 
        fontSize: 20
    },
    popupInputTextHeader: {
        flexDirection: "row"
    },
    refreshIcon: {
        alignItems:"center", 
        margin: 5, 
        flex: 1, 
        justifyContent: "flex-end"
    },
});

export const ImageAreaStyles = StyleSheet.create({
    blankImageContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: Dimensions.get('window').width, 
        height: imageAreaHeight, 
        backgroundColor: 'rgba(0,0,0,.3)'
    }, 
    text: {
        fontSize: 25
    },
    image: {
        width: Dimensions.get('window').width, 
        height: imageAreaHeight
    }
});
