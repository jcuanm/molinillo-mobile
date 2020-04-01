import React from 'react';
import { 
    Alert,
    Text,
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../helpers/Constants';
import { ShippoConfig } from '../../../assets/Config';
import { PaymentScreenStyles } from './styles';
import CreditCardInfo from './components/CreditCardInfo';
import BillingAddressInput from './components/BillingAddressInput';


export default class PaymentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.order = this.props.navigation.getParam('order', {});
        this.updatePaymentInfo = this.updatePaymentInfo.bind(this); 
        this.updateToShippingAddress = this.updateToShippingAddress.bind(this); 
        this.minCreditCardLength = 4;

        this.state = {
            // Card Info
            nameOnCard: "",
            creditCardNumber: "",
            cvc: "",
            expirationMonth: "01", // Default to January
            expirationYear: (new Date().getFullYear()).toString(), // Default to current year

            // Billing Address info
            useShippingAddress: false,
            streetAddress1: "",
            streetAddress2: "",
            phone: "",
            city: "",
            state: "AL",
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
            phone: shippingAddress.phone,
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
            phone,
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
                    phone={phone}
                    city={city}
                    state={state}
                    zipcode={zipcode}
                    country={country}
                />

                <TouchableOpacity 
                    onPress={() => this.checkIfShouldProceed() } 
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
        this.props.navigation.navigate(
            "ReviewOrderScreen", 
            { 
                order: this.order,
                billingInfo: this.state
            }
        );
    }

    isValidExpirationDate(){
        const { expirationMonth, expirationYear } = this.state;

        let today = new Date();
        let currMonth = today.getMonth();
        let currYear = today.getFullYear();

        return (parseInt(expirationYear) > currYear) || (parseInt(expirationYear) == currYear && parseInt(expirationMonth) - 1 >= currMonth); 
    }

    areRequiredFieldsCompleted(){
        const {
            // Card Info
            nameOnCard,
            creditCardNumber,
            cvc,
            expirationMonth,
            expirationYear,

            // Billing Address info
            streetAddress1,
            phone,
            city,
            state,
            zipcode,
            country,
        } = this.state;


        return (
            nameOnCard.trim() !== "" &&
            creditCardNumber.trim() !== "" &&
            creditCardNumber.trim().length >= this.minCreditCardLength &&
            cvc.trim() !== "" &&
            phone.trim() !== "" &&
            expirationMonth.trim() !== "" &&
            expirationYear.trim() !== "" &&
            streetAddress1.trim() !== "" &&
            city.trim() !== "" &&
            state.trim() !== "" &&
            zipcode.trim() !== "" &&
            country.trim() !== ""
        );
    }

    checkIfShouldProceed(){
        const {
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country
        } = this.state;

        if(!this.areRequiredFieldsCompleted()){
            Alert.alert(
                "You must fill in all of the required fields.",
                "",
                [{text: 'OK'}],
                { cancelable: false }
            );

            return false;
        }
        else if(!this.isValidExpirationDate()){
            Alert.alert(
                "Invalid expiration date.",
                "According to the date, this card is expired. Please use another card.",
                [{text: 'OK'}],
                { cancelable: false }
            );

            return false;
        }

        // Check if is valid address using Shippo
        let request = fetch('https://api.goshippo.com/addresses/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "ShippoToken " + ShippoConfig.apiKey
            },
            body: JSON.stringify({
                street1: streetAddress1,
                street2: streetAddress2,
                city: city,
                state: state,
                zip: zipcode,
                country: country,
                validate: true
            })
        });

        request
            .then(response => {
                let jsonResponse = response.json();

                jsonResponse
                    .then(validationMetaData =>{
                        
                        if(!validationMetaData.validation_results.is_valid){
                            Alert.alert(
                                "An invalid invalid address was inputted.",
                                "",
                                [{text: 'OK'}],
                                { cancelable: false }
                            );
                        }
                        else{
                            this.proceed();
                        }
                    })
                    .catch(error => {
                        console.log("Error converting request to JSON.")
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log("Error making request to Shippo.");
                console.log(error);
            });
    }
}
