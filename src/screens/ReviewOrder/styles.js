import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

const screenMargin = 15;
export const ReviewOrderScreenStyles = StyleSheet.create({
    container: {
        marginTop:10,
        marginLeft:screenMargin,
        marginRight: screenMargin
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    proceedToCheckoutButton: {
        marginTop: 10,
        width: Dimensions.get('window').width - 20,
        height: 40,
        backgroundColor: "gold",
        alignSelf:"center",
        justifyContent: "center"
    },
    proceedToCheckoutText: {
        textAlign: "center",
        fontWeight: 'bold'
    },
    policyText: {
        marginTop: 60,
        fontSize:12,
    }
});

const valueFontSize = 15;
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
        fontSize: valueFontSize,
        flex:2,
        fontWeight:"bold",
        color: Colors.Secondary
    },
    deliveryMethodValue:{
        textAlign: "right",
        fontSize: valueFontSize,
        flex:2,
        fontWeight:"bold",
        color: Colors.Secondary
    },
});

export const PriceBreakdownStyles = StyleSheet.create({
    calculation: {
        marginTop:5,
        flexDirection:"row",
        justifyContent:"center"
    },
    calculationTitle: {
        fontSize: valueFontSize,
        flex:2
    },
    calculationAmount: {
        flex:2,
        textAlign: "right",
        fontSize: valueFontSize,
    },
    orderTotalTitle: {
        color:Colors.Primary,
        fontWeight: "bold"
    },
    orderTotalAmount:{
        color:"red",
        fontWeight:"bold"
    },
    orderTotalBorder: {
        marginTop:5,
        paddingTop:5,
        borderTopColor: "grey", 
        borderTopWidth: 1,
    },
});
