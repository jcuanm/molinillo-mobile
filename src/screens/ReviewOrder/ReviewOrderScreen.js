import React, { Component } from 'react';
import { 
    Alert,
    FlatList, 
    Linking,
    ScrollView, 
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Stripe from 'react-native-stripe-api';
import { ShippoConfig, StripeConfig } from '../../../assets/Config';
import { Colors, PrivacyPolicyUrl } from '../../helpers/Constants';
import { ReviewOrderScreenStyles } from './styles';
import PriceBreakdown from './components/PriceBreakdown';
import DeliveryMethod from './components/DeliveryMethod';
import ReviewItem from './components/ReviewItem';
import DbHandler from '../../helpers/DbHandler';
import PaymentMethod from './components/PaymentMethod';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';

export default class ReviewOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.stripeClient = new Stripe(StripeConfig.apiKey);
        this.order = this.props.navigation.getParam('order', {});
        this.billingInfo = this.props.navigation.getParam('billingInfo', {});
        this.state = {
            shippingCost: 0
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Review Order",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()} style={ReviewOrderScreenStyles.headerButton}>
                <Ionicons 
                    name="md-arrow-back" 
                    size={25} 
                    color={Colors.Secondary} 
                />
            </TouchableOpacity>
        )
    })

    componentDidMount(){
        if(this.order.selectedDeliveryMethod == "shipping" && this.order.shippingAddress != undefined){
            this.getShippingCosts();
        }
    }

    getShippingCosts(){
        const { cartItems, shippingAddress } = this.order;
            
        for(var cartItem of cartItems){
            let chocolateShippingInfoRef = this.dbHandler.getRef(
                "ChocolateShippingInfo", 
                null, 
                cartItem.chocolateUuid);
                            
            chocolateShippingInfoRef
                .get()
                .then( results => {
                    if(results.exists){
                        let shippingInfo = results.data(); 

                        fetch('https://api.goshippo.com/shipments/', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: "ShippoToken " + ShippoConfig.apiKey
                            },
                            body: JSON.stringify({
                                address_to: {
                                    name: shippingAddress.userFullName,
                                    street1: shippingAddress.streetAddress1,
                                    street2: shippingAddress.streetAddress2,
                                    city: shippingAddress.city,
                                    state: shippingAddress.state,
                                    zip: shippingAddress.zipcode,
                                    country: shippingAddress.country
                                },
                                address_from: {
                                    name: shippingInfo.name,
                                    street1: shippingInfo.street1,
                                    street2: shippingInfo.street2,
                                    city: shippingInfo.city,
                                    state: shippingInfo.state,
                                    zip: shippingInfo.zip,
                                    country: shippingInfo.country,
                                },
                                parcels: this.getParcels(shippingInfo, cartItem.quantity),
                                async: false
                            }),
                        })
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log(responseJson.rates);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                    else{

                        // Navigate away from the page if we can't find the shipping info for a chocolate
                        
                        this.props.navigation.popToTop();

                        Alert.alert(
                            "We apologize for the inconvenience",
                            "There was an error in trying to process one or more of your chocolates.",
                            [{text: 'OK'}],
                            { cancelable: false }
                        );
                    }
                })
                .catch( error => {
                    console.log(error);
                });
        }
    }

    getParcels(shippingInfo, quantity){
        let parcels = [];

        for(var i = 0; i < quantity; i++){
            let parcel = {
                length: shippingInfo.length,
                width: shippingInfo.width,
                height: shippingInfo.height,
                distance_unit: shippingInfo.distance_unit,
                weight: shippingInfo.weight,
                mass_unit: shippingInfo.mass_unit
            }

            parcels.push(parcel);
        }
        
        return parcels;
    }

    handleShippingCostNotFound(){
        // Navigate away from the page if we can't find the shipping info for a chocolate
                        
        this.props.navigation.popToTop();

        Alert.alert(
            "We apologize for the inconvenience",
            "There was an error in trying to process one or more of your chocolates.",
            [{text: 'OK'}],
            { cancelable: false }
        );
    }

    render(){
        const { 
            cartItems, 
            selectedDeliveryMethod,
            shippingAddress
        } = this.order;

        const { nameOnCard, creditCardNumber } = this.billingInfo;
        
        return(
            <ScrollView style={ReviewOrderScreenStyles.container}> 

                <DeliveryMethod 
                    shippingAddress={shippingAddress}
                    selectedDeliveryMethod={selectedDeliveryMethod} 
                />

                <FlatList
                    data={cartItems}
                    renderItem={({_, index}) => this.renderItem(cartItems[index])}
                    keyExtractor={(_, index) => index.toString()}
                />

                <PaymentMethod
                    nameOnCard={nameOnCard}
                    creditCardNumber={creditCardNumber}
                />

                <PriceBreakdown 
                    cartItems={cartItems}
                    selectedDeliveryMethod={selectedDeliveryMethod}
                />

                <Text style={ReviewOrderScreenStyles.policyText}>
                    By placing your order, you agree to Molinillo's <Text 
                        onPress={() => this.openWebpage(PrivacyPolicyUrl)} 
                        style={ReviewOrderScreenStyles.policyLink}>
                            privacy policy
                    </Text> and terms of use. All sales are final after being placed.
                </Text>

                <RNSlidingButton
                    style={ReviewOrderScreenStyles.finalizeSlider}
                    height={40}
                    onSlidingSuccess={() => this.placeOrder()}
                    slideDirection={SlideDirection.RIGHT}
                >
                    <Text style={ReviewOrderScreenStyles.finalizeText}>
                        Slide right to place order >
                    </Text>
                </RNSlidingButton>
            </ScrollView>
        );
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
    
    placeOrder(){
        console.log("Place order");
    }
}
