import { Dimensions, StyleSheet } from 'react-native';

export const CartScreenStyles = StyleSheet.create({
    container: {
        flex: 1
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
});

export const CartItemStyles = StyleSheet.create({
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
    producerName: {
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
        marginLeft:15, 
        borderColor:"grey", 
        borderWidth:1, 
        backgroundColor:"white", 
        width:30, 
        height:30
    }
});
