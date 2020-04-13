import React, { Component } from 'react';
import { 
    Alert,
    FlatList, 
    Linking,
    ScrollView, 
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { StripeConfig } from '../../../assets/Config';
import Dialog from "react-native-dialog";
import { Colors, PrivacyPolicyUrl, TermsAndServicesUrl } from '../../helpers/Constants';
import { VendorConfirmationScreenStyles } from './styles';
import PriceBreakdown from './components/PriceBreakdown';
import DeliveryMethod from './components/DeliveryMethod';
import ReviewItem from './components/ReviewItem';
import DbHandler from '../../helpers/DbHandler';

export default class VendorConfirmationScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.order = this.props.navigation.getParam('order', {});
        this.income = this.props.navigation.getParam('income', {});
        this.decimalPlaces = 2;

        this.state = {
            isDialogVisible: false,
            reason: ''
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Vendor Confirmation",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()} style={VendorConfirmationScreenStyles.headerButton}>
                <Ionicons 
                    name="md-arrow-back" 
                    size={25} 
                    color={Colors.Secondary} 
                />
            </TouchableOpacity>
        )
    })

    render(){
        let { 
            cartItems, 
            shippingAddress,
            selectedDeliveryMethod,
            phone,
            vendorAddress,
            subtotal,
            shippingCost,
            tax,
            vendorCommission,
            orderUuid,
            stripeCustomerId,
            orderTotal,
            vendorEmail,
        } = this.order;

        cartItems = JSON.parse(cartItems);
        
        return(
            <ScrollView style={VendorConfirmationScreenStyles.container}> 

                <DeliveryMethod 
                    vendorAddress={vendorAddress}
                    phone={phone}
                    shippingAddress={shippingAddress}
                    selectedDeliveryMethod={selectedDeliveryMethod} 
                />
 
                <FlatList
                    data={cartItems}
                    renderItem={({_, index}) => this.renderItem(cartItems[index])}
                    keyExtractor={(_, index) => index.toString()}
                />

                <PriceBreakdown 
                    income={this.income}
                    subtotal={subtotal}
                    tax={tax}
                    shippingCost={shippingCost}
                    selectedDeliveryMethod={selectedDeliveryMethod}
                    vendorCommission={vendorCommission}
                />

                <Text style={VendorConfirmationScreenStyles.policyText}>
                    By confirming this order, you agree to Molinillo's <Text 
                        onPress={() => this.openWebpage(PrivacyPolicyUrl)} 
                        style={VendorConfirmationScreenStyles.policyLink}>
                            privacy policy
                    </Text> and <Text 
                        onPress={() => this.openWebpage(TermsAndServicesUrl)} 
                        style={VendorConfirmationScreenStyles.policyLink}>
                            terms of use
                    </Text> as outlined on our website. All sales are final after being placed.
                </Text>

                <View style={VendorConfirmationScreenStyles.buttonsContainer}>
                    <TouchableOpacity 
                        onPress={() => this.confirmOrder(orderUuid, stripeCustomerId, orderTotal, vendorEmail)}
                        style={[VendorConfirmationScreenStyles.acknowledgeButton, {backgroundColor:'green'}]}
                    >
                        <Text style={VendorConfirmationScreenStyles.acknowledgeButtonText}>
                            Confirm
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.setState({ isDialogVisible: true })} 
                        style={[VendorConfirmationScreenStyles.acknowledgeButton, {backgroundColor:'red'}]}
                    >
                        <Text style={VendorConfirmationScreenStyles.acknowledgeButtonText}>
                            Decline
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pop-up dialog box for order cancellation */}
                <Dialog.Container visible={this.state.isDialogVisible}>
                    <Dialog.Title>Order Decline Reason</Dialog.Title>
                    <Dialog.Description>
                       Will be sent to the customer upon submission
                    </Dialog.Description>
                    <Dialog.Input onChangeText={text => this.setState({reason: text})}></Dialog.Input>
                    <Dialog.Button label="Confirm" onPress={() => this.declineOrder(orderUuid)} />
                    <Dialog.Button label="Cancel" onPress={() => this.setState({isDialogVisible: false})} />
                </Dialog.Container>

            </ScrollView>
        );
    }

    confirmOrder(orderUuid, stripeCustomerId, orderTotal, vendorEmail){
        
        // Charge the customer
        request = this.makePOSTRequest(
            "https://api.stripe.com/v1/charges", 
            this.getPostBody(orderTotal, stripeCustomerId, vendorEmail), 
            apikey=StripeConfig.apiKey
        );

        request
            .then(response => {
                let jsonRequest = response.json();

                jsonRequest
                    .then(transaction => {
                        this.addToOrderHistory(transaction);
                        this.updateAmountOwed(this.dbHandler.currUser.uid);
                    })
                    .catch(error => {
                        console.log("Error converting response to JSON object.");
                        console.log(error);
                    });
                
                this.deleteOrder(orderUuid);
            })
            .catch(error => {
                console.log("Error trying to create Stripe customer object.");
                console.log(error);
            });
    }

    declineOrder(orderUuid){
        this.deleteOrder(orderUuid);
        this.setState({isDialogVisible: false});
    }

    deleteOrder(orderUuid){
        let orderRef = this.dbHandler.getRef("Orders", barcode=null, chocolateUuid=null, commentUuid=null, orderUuid=orderUuid);

        orderRef
            .delete()
            .then(_ => {
                this.props.navigation.navigate("OrdersScreen");
            })
            .catch(error => {
                console.log(error);

                Alert.alert(
                    "There was an error connecting to the database.",
                    "Please try again later.",
                    [{text: 'OK'}],
                    { cancelable: false }
                );
            });
    }

    addToOrderHistory(transaction){
        let orderHistoryRef = this.dbHandler.getRef("OrderHistory");
        let payload = {
            ...this.order,
            stripeTransactionId: transaction.id,
            receipt_number: transaction.receipt_number,
            receiptUrl: transaction.receipt_url,
            timeConfirmed: transaction.created
        }

        orderHistoryRef.set(payload);
    }

    updateAmountOwed(vendorUid){
        let amountOwedRef = this.dbHandler.getRef("AmountOwed");
        let increment = firebase.firestore.FieldValue.increment(parseFloat(this.income));

        amountOwedRef.set({ [vendorUid]: increment }, { merge: true });
    }

    renderItem(item){
        const { 
            imageDownloadUrl,
            producerName,
            confectionName,
            vendorAddress,
            quantity,
            price
        } = item;

        return(
            <ReviewItem
                selectedDeliveryMethod={this.order.selectedDeliveryMethod}
                vendorAddress={vendorAddress}
                imageDownloadUrl={imageDownloadUrl}
                producerName={producerName}
                confectionName={confectionName}
                quantity={quantity}
                price={price}
            />
        );
    }

    openWebpage(url){
		if(url){
			Linking
				.canOpenURL(url)
				.then(supported =>{
					if(supported){
						Linking.openURL(url);
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
    }

    makePOSTRequest(url, postBody, apiKey=""){
        return(
            fetch(url, {    
               method: 'POST',    
               headers: {      
                   Accept: 'application/json',      
                   'Content-Type': 'application/x-www-form-urlencoded',    
                   Authorization: "Bearer " + apiKey 
               },   
               body: postBody
           })
        );
    }

    getPostBody(orderTotal, stripeCustomerId, vendorEmail){
        return (
            "customer=" + stripeCustomerId + "&" +
            "amount=" + (orderTotal * 100) + "&" + 
            "currency=usd" + "&" +
            "receipt_email=" + vendorEmail
        );
    }
}
