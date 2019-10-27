import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../../helpers/Constants';

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
        color:Colors.Secondary, 
        paddingLeft:15
    }
});

export const ProfileOptionsStyles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    }
});

export const FeedbackStyles = StyleSheet.create({
    modalContainer: {
        alignSelf:"center"
    },
    popupTextInputContainer: {
        backgroundColor:"white", 
        width: 330, 
        height: 190, 
        alignContent:"center", 
        justifyContent:"center",
        backgroundColor: Colors.Primary
    },
    popupTextInputTitle: {
        margin:5, 
        fontSize: 14, 
        fontWeight:"bold",
        flex:1,
        justifyContent:"flex-start",
        color: "white"
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
    }
});
