import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const PaymentScreenStyles = StyleSheet.create({
    container: {
        marginTop:10,
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    proceedToReviewButton: {
        marginTop: 25,
        margin:10,
        width: Dimensions.get('window').width - 20,
        height: 40,
        backgroundColor: "gold",
        alignSelf:"center",
        justifyContent: "center"
    },
    proceedToReviewText: {
        textAlign: "center",
        fontWeight: 'bold'
    },
});

const inputPadding = 5;
export const CreditCardInfoStyles = StyleSheet.create({
    inputBox: {
        marginTop: 10,
        width: Dimensions.get('window').width - 20,
        paddingLeft: inputPadding,
        paddingRight: inputPadding,
        height: 30,
        borderColor: Colors.Primary,
        borderWidth:1,
        alignSelf: "center"
    },
    cvcBox: {
        marginTop: 10,
        width: Dimensions.get('window').width/3 - 20,
        marginLeft: inputPadding + 5,
        paddingLeft: inputPadding,
        paddingRight: inputPadding,
        height: 30,
        borderColor: Colors.Primary,
        borderWidth:1,
        alignSelf: "flex-start"
    },
    pickersContainer: {
        flexDirection:"row",
        alignContent: "flex-start"
    },
    picker: {
        marginTop:20,
        flex:1,
        backgroundColor: Colors.Primary,
        color: Colors.Secondary,
        width:50,
        height:30,
        transform: [{ scaleX: .9 }, { scaleY: .9 }],
    },
    iosPicker: {
        marginTop: -30,
        flex:1,
        transform: [{ scaleX: .7 }, { scaleY: .7 }],
    },
    title: {
        fontWeight: "bold",
        marginTop:20,
        paddingLeft: inputPadding + 5,
        color: Colors.Primary
    },
});

const inputWidth = Dimensions.get('window').width - 20;
const inputHeight = 30;
const marginTop = 10;
export const BillingAddressInputStyles = StyleSheet.create({
    checkbox:{
        flex: 1, 
        padding: 10
    },
    inputBox: {
        marginTop: marginTop,
        width: inputWidth,
        paddingLeft: inputPadding,
        paddingRight: inputPadding,
        height: inputHeight,
        borderColor: Colors.Primary,
        borderWidth:1,
        alignSelf: "center"
    },
    chevron: {
        alignSelf:"flex-end"
    },
    countryButton: {
        marginTop: marginTop,
        width: inputWidth,
        height: inputHeight,
        backgroundColor: "rgba(0,0,0,.1)",
        paddingLeft: inputPadding,
        paddingRight: inputPadding,
        borderColor: Colors.Primary,
        borderWidth:1,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    countryButtonText: {
        marginTop: 5,
        fontSize: 15,
        flex:2
    },
    popupModal: {
        alignContent: 'center',
        alignSelf:"center",
    },
    popupFlatlistContainer: {
        marginTop: 20,
        width: 300
    },
    popupEntriesBackground: {
        backgroundColor: Colors.Secondary, 
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey",
    },
    popupEntriesText: {
        textAlign:'center', 
        fontSize: 20
    },
    title: {
        fontWeight: "bold",
        marginTop:20,
        paddingLeft: inputPadding + 5,
        color: Colors.Primary
    },
});
