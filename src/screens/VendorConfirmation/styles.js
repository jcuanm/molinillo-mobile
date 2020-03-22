import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

const screenMargin = 15;

export const VendorConfirmationScreenStyles = StyleSheet.create({
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
    finalizeSlider: {
        marginTop: 25,
        margin:10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: "green",
        alignSelf:"center",
    },
    finalizeText: {
        textAlign: "center",
        fontWeight: 'bold',
        color:"white"
    },
    policyLink: {
        color: "#004C99"
    },
    policyText: {
        marginLeft: screenMargin,
        marginRight: screenMargin,
        marginTop: 50,
        fontSize:12,
    },
    buttonsContainer: {
        flexDirection:'row'
    },
    acknowledgeButton: {
        flex:1,
        margin: 10,
        padding: 5
    },
    acknowledgeButtonText: {
        color: "white",
        textAlign:"center",
        fontWeight: "bold"
    }
});

export const DeliveryMethodStyles = StyleSheet.create({
    deliveryMethodContainer:{
        backgroundColor: Colors.Primary,
        padding: 5,
        marginBottom:5,
        marginTop:5,
        flexDirection:"row",
        justifyContent:"center"
    },
    deliveryMethodTitle:{
        flex:2,
        fontWeight:"bold",
        color: Colors.Secondary
    },
    deliveryMethodValue:{
        textAlign: "left",
        flex:2,
        fontWeight:"bold",
        color: Colors.Secondary
    },
});

export const PriceBreakdownStyles = StyleSheet.create({
    calculation: {
        marginTop:5,
        marginLeft:screenMargin,
        marginRight: screenMargin,
        flexDirection:"row",
        justifyContent:"center"
    },
    calculationTitle: {
        flex:2
    },
    calculationAmount: {
        flex:2,
        textAlign: "right",
    },
    container: {
        marginTop:15
    },
    orderTotalTitle: {
        color:Colors.Primary,
        fontWeight: "bold"
    },
    orderTotalAmount:{
        color:"green",
        fontWeight:"bold"
    },
    orderTotalBorder: {
        marginTop:5,
        paddingTop:5,
        borderTopColor: "grey", 
        borderTopWidth: 1,
    },
});

export const ReviewItemStyles = StyleSheet.create({
    container: {
        marginTop:10,
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
    importantText: {
        fontWeight:"bold",
    },
    quantityAmountText: {
        fontWeight:"normal",
    },
    priceText: {
        color: "green"
    }
});
