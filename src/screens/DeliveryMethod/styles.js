import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const DeliveryMethodScreenStyles = StyleSheet.create({
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iosDeliveryMethodText: {
        fontWeight:"bold", 
        color: Colors.Secondary, 
        textAlign:"center", 
        fontSize:18
    },
    popupModal: {
        alignContent: 'center',
        alignSelf:"center",
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
    },
    promptText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    headerImage: {
        height:40, 
        width:40
    },
    pickerContainer: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        padding: 35,
        marginBottom: 30
    },
    picker: {
        backgroundColor: Colors.Primary,
        color: Colors.Secondary,
        borderBottomWidth: 2,
        width:100,
        height:30,
        transform: [{ scaleX: .9 }, { scaleY: .9 }],
        alignSelf: "center",
        margin:5,
        justifyContent: "center"
    },
    proceedToCheckoutButton: {
        marginTop: 60,
        width: Dimensions.get('window').width - 20,
        height: 40,
        backgroundColor: "gold",
        margin: 10,
        alignSelf:"center",
        justifyContent: "center"
    },
    proceedToCheckoutText: {
        textAlign: "center",
        fontWeight: 'bold'
    },
});

export const ItemPickupLocationStyles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        flexDirection:"row",
        backgroundColor: "white",
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height/4,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent:"center"
    },
    image: {
        width: 120, 
        height: 120,
        flex:1
    },
    itemInfoContainer: {
        flex:1
    },
    listingTitle: {
        fontWeight:"bold"
    },
    listingSubtitle: {
        fontSize: 12, 
        fontWeight: 'bold'
    },
    quantityChangerContainer:{
        flexDirection:"row", 
        marginTop:20
    },
    quantityChangerSymbol: {
        textAlign:"center", 
        fontSize:28
    },
    importantText: {
        fontWeight:"bold"
    },
    quantityTextContainer: {
        justifyContent:"center", 
        borderColor:"grey", 
        borderWidth:1, 
        backgroundColor:"white", 
        width:60, 
        height:30
    },
    quantityText: {
        textAlign:"center"
    },
    quantityChangerButton:{
        justifyContent:"center",  
        borderColor:"grey", 
        borderWidth:1, 
        backgroundColor:"white", 
        width:30, 
        height:30
    },
    trashIcon: {
        marginRight:15
    }
});

const inputPadding = 5;
const inputWidth = Dimensions.get('window').width - 20;
const inputHeight = 30;
const marginTop = 10;
export const ShippingAddressInputStyles = StyleSheet.create({
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
});
