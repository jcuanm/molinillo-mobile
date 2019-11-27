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
        borderBottomColor: Colors.Primary,
        borderBottomWidth: 1,
        padding: 35
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
    },
    proceedToCheckoutButton: {
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
    }
});

export const ItemLocationStyles = StyleSheet.create({
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
