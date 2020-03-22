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
import { Ionicons } from '@expo/vector-icons';
import { StripeConfig } from '../../../assets/Config';
import Dialog from "react-native-dialog";
import { Colors, PrivacyPolicyUrl } from '../../helpers/Constants';
import { VendorConfirmationScreenStyles } from './styles';
import PriceBreakdown from './components/PriceBreakdown';
import DeliveryMethod from './components/DeliveryMethod';
import ReviewItem from './components/ReviewItem';
import DbHandler from '../../helpers/DbHandler';
const uuidv4 = require('uuid/v4');

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
            orderUuid
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
                    </Text> and terms of use. All sales are final after being placed.
                </Text>

                <View style={VendorConfirmationScreenStyles.buttonsContainer}>
                    <TouchableOpacity style={[VendorConfirmationScreenStyles.acknowledgeButton, {backgroundColor:'green'}]}>
                        <Text style={VendorConfirmationScreenStyles.acknowledgeButtonText}>
                            Confirm
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.setState({ isDialogVisible: true })} 
                        style={[VendorConfirmationScreenStyles.acknowledgeButton, {backgroundColor:'red'}]}
                    >
                        <Text style={VendorConfirmationScreenStyles.acknowledgeButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pop-up dialog box for order cancellation */}
                <Dialog.Container visible={this.state.isDialogVisible}>
                    <Dialog.Title>Order Cancellation Reason</Dialog.Title>
                    <Dialog.Description>
                       Will be sent to the customer upon submission
                    </Dialog.Description>
                    <Dialog.Input onChangeText={text => this.setState({reason: text})}></Dialog.Input>
                    <Dialog.Button label="Confirm" onPress={() => this.cancelOrder(orderUuid)} />
                    <Dialog.Button label="Cancel" onPress={() => this.setState({isDialogVisible: false})} />
                </Dialog.Container>

            </ScrollView>
        );
    }

    confirmOrder(){

    }

    cancelOrder(orderUuid){
        //TODO: Email user with the reason for cancellation
        console.log(this.state.reason);

        let orderRef = this.dbHandler.getRef("Orders", barcode=null, chocolateUuid=null, commentUuid=null, orderUuid=orderUuid);

        orderRef
            .delete()
            .then(_ => {
                this.props.navigation.popToTop();
                this.props.navigation.navigate("SearchScreen");
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
        
        this.setState({isDialogVisible: false});
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
}
