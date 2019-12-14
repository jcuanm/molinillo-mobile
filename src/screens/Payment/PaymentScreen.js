import React from 'react';
import { 
    Alert,
    Text,
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../helpers/Constants';
import { PaymentScreenStyles } from './styles';
import Stripe from 'react-native-stripe-api';
import { StripeConfig } from '../../../assets/Config';
import CreditCardInfo from './components/CreditCardInfo';
import BillingAddressInput from './components/BillingAddressInput';


export default class PaymentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.order = this.props.navigation.getParam('order', {});
        this.stripeClient = new Stripe(StripeConfig.apiKey);
        this.updatePaymentInfo = this.updatePaymentInfo.bind(this); 
        this.updateToShippingAddress = this.updateToShippingAddress.bind(this); 

        this.state = {
            nameOnCard: "",
            creditCardNumber: "",
            cvc: "",
            expirationMonth: "01", // Default to January
            expirationYear: (new Date().getFullYear()).toString(), // Default to current year

            // Delivery Address info
            useShippingAddress: false,
            streetAddress1: "",
            streetAddress2: "",
            city: "",
            state: "",
            zipcode: "",
            country: "United States",
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Payment Method",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()} style={PaymentScreenStyles.headerButton}>
                <Ionicons 
                    name="md-arrow-back" 
                    size={25} 
                    color={Colors.Secondary} 
                />
            </TouchableOpacity>
        )
    });

    updatePaymentInfo(field, value){
        this.setState({[field] : value});
    }

    updateToShippingAddress(useShippingAddress, shippingAddress){
        this.setState({
            useShippingAddress: !useShippingAddress,
            streetAddress1: shippingAddress.streetAddress1,
            streetAddress2: shippingAddress.streetAddress2,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipcode: shippingAddress.zipcode,
            country: shippingAddress.country
        });
    }

    render(){
        const { 
            selectedDeliveryMethod,
            shippingAddress
        } = this.order;

        let {

            // Credit card info
            nameOnCard,
            useShippingAddress,
            creditCardNumber,
            cvc,
            expirationMonth,
            expirationYear,

            // Billing address info
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country,
        } = this.state;

        return(
            <ScrollView>

                <CreditCardInfo 
                    updatePaymentInfo={this.updatePaymentInfo}
                    nameOnCard={nameOnCard}
                    creditCardNumber={creditCardNumber}
                    cvc={cvc}
                    expirationMonth={expirationMonth}
                    expirationYear={expirationYear}
                />

                <BillingAddressInput 
                    updatePaymentInfo={this.updatePaymentInfo}
                    useShippingAddress={useShippingAddress}
                    updateToShippingAddress={this.updateToShippingAddress}
                    shippingAddress={shippingAddress}
                    selectedDeliveryMethod={selectedDeliveryMethod}
                    streetAddress1={streetAddress1}
                    streetAddress2={streetAddress2}
                    city={city}
                    state={state}
                    zipcode={zipcode}
                    country={country}
                />

                <TouchableOpacity 
                    onPress={() => this.proceed() } 
                    style={PaymentScreenStyles.proceedToReviewButton}
                >
                    <Text style={PaymentScreenStyles.proceedToReviewText}>
                        Proceed to review
                    </Text>
                </TouchableOpacity>
                
            </ScrollView>
        );
    }

    proceed(){
        if(this.isVerifiedToProceed()){
            this.props.navigation.navigate(
                "ReviewOrderScreen", 
                { 
                    order: this.order,
                    billingInfo: this.state
                }
            );
        }
        else{
            Alert.alert(
                "You must fill in the required fields",
                "",
                [
                  {text: 'OK'}
                ],
                { cancelable: false }
            );
            return;
        }
    }

    isVerifiedToProceed(){
        const {
            nameOnCard,
            creditCardNumber,
            cvc,
            expirationMonth,
            expirationYear,

            // Billing Address info
            streetAddress1,
            city,
            state,
            zipcode,
            country,
        } = this.state;

        // Ensure required fields are filled in
        return (
            nameOnCard.trim() !== "" &&
            creditCardNumber.trim() !== "" &&
            cvc.trim() !== "" &&
            expirationMonth.trim() !== "" &&
            expirationYear.trim() !== "" &&
            streetAddress1.trim() !== "" &&
            city.trim() !== "" &&
            state.trim() !== "" &&
            zipcode.trim() !== "" &&
            country.trim() !== ""
        );
    }
}
