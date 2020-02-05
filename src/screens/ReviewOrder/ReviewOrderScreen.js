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
        this.maxParcelWeightInOunces = 2400; // According to UPS
        this.maxCombinedDimensions = 108; // length + width + height
        this.stripeClient = new Stripe(StripeConfig.apiKey);
        this.order = this.props.navigation.getParam('order', {});
        this.billingInfo = this.props.navigation.getParam('billingInfo', {});
        this.state = {
            shippingCostsPerVendor: {},
            chocolatesWithTaxRates: [],
            chocolatesWithShippingRates: [],
            taxPerVendor: {}
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
        const { selectedDeliveryMethod, shippingAddress } = this.order;

        this.getTaxRates()
        
        if(selectedDeliveryMethod == "shipping" && shippingAddress !== undefined){
            this.getShippingCosts();
        }
    }

    getTaxRates(){
        const { cartItems } = this.order;

        let taxRatesRequests = this.getTaxRatesRequests(cartItems);

        Promise
            .all(taxRatesRequests)
            .then(taxRatesResults => {
                let taxRatesInfoPerChocolate = {};

                for(let results of taxRatesResults){
                    if(results.exists){
                        let taxRateInfo = results.data();
                        let chocolateUuid = results.id;
                        let vendorUid = taxRateInfo.vendorUid;
                        taxRatesInfoPerChocolate[chocolateUuid] = {
                            taxRate: taxRateInfo.taxRate,
                            vendorUid: vendorUid
                        };
                    }
                }

                let chocolatesWithTaxRates = [];
                let taxPerVendor = {};

                for(let item of cartItems){
                    let chocolateUuid = item.chocolateUuid;

                    if(taxRatesInfoPerChocolate[chocolateUuid] !== undefined){
                        let taxRate = taxRatesInfoPerChocolate[chocolateUuid].taxRate;
                        let vendorUid = taxRatesInfoPerChocolate[chocolateUuid].vendorUid;
                        let subtotal = item.price * item.quantity;
                        let totalTax = subtotal * taxRate;

                        taxPerVendor[vendorUid] = taxPerVendor[vendorUid] === undefined ? 
                                                                totalTax : 
                                                                taxPerVendor[vendorUid] + totalTax;
                        chocolatesWithTaxRates.push(chocolateUuid);
                    }
                }

                this.setState({ 
                    taxPerVendor: taxPerVendor,
                    chocolatesWithTaxRates: chocolatesWithTaxRates
                });
            })
            .catch(error => {
                console.log("Error retrieving tax rates.");
                console.log(error);
            });
    }

    getTaxRatesRequests(cartItems){
        let taxRatesRequests = [];

        for(let item of cartItems){
            let taxRatesRef = this.dbHandler.getRef(
                "TaxRates",
                barcode=null,
                chocolateUuid=item.chocolateUuid
            );
            
            let request = taxRatesRef.get();
            taxRatesRequests.push(request);
        }

        return taxRatesRequests;
    }

    // This function makes waves of HTTP requests to Firebase and Shippo and waits for each request in each
    // wave to return results before doing something with the results.
    getShippingCosts(){
        const { cartItems, shippingAddress } = this.order;
        let shippingInfoRequests = [];
        let quantities = [];
        
        // Initiating first wave of Firebase calls to get shipping info (weight, dimensions, etc.)
        for(var i = 0; i < cartItems.length; i++){
            let chocolateShippingInfoRef = this.dbHandler.getRef(
                "ChocolateShippingInfo", 
                null, 
                cartItems[i].chocolateUuid);
            
            let request = chocolateShippingInfoRef.get();
            shippingInfoRequests.push(request);
            quantities.push(cartItems[i].quantity);
        }

        // Wait until all Firebase calls resolve until doing something with the shippingInfoResults array
        Promise
            .all(shippingInfoRequests)
            .then(shippingInfoResults => {
                let shippoRequests = [];

                // Making a call to Shippo for each chocolate to find out shipping rates by
                // starting the next wave of requests to Shippo's API
                // for(var results of shippingInfoResults){
                for(let i = 0; i < shippingInfoResults.length; i++){
                    let results = shippingInfoResults[i];

                    if(results.exists){
                        let quantity = quantities[i];
                        let shippingInfo = results.data();
                        let chocolateUuid = results.id;  

                        let request = fetch('https://api.goshippo.com/shipments/', {
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
                                metadata: shippingInfo.vendorUid + "_" + chocolateUuid,
                                parcels: this.getParcels(shippingInfo, quantity),
                                async: false
                            })
                        });

                        shippoRequests.push(request);
                    }
                }

                // Wait until all Shippo requests resolve before processing them in the responses array
                Promise
                    .all(shippoRequests)
                    .then(responses => {
                        let responsePromises = [];

                        for(var response of responses){
                            responsePromises.push(response.json());
                        }

                        // Iterating through all of the shipping rates returned by Shippo... finally
                        Promise
                            .all(responsePromises)
                            .then(shippingCosts => {
                                let shippingCostsPerVendor = {};
                                let chocolatesWithShippingRates = [];

                                for(var shippingCostInfo of shippingCosts){
                                    try{
                                        let vendorUidAndChocolateUuid = shippingCostInfo.metadata.split("_");
                                        let vendorUid = vendorUidAndChocolateUuid[0];
                                        let chocolateUuid = vendorUidAndChocolateUuid[1];

                                        // Only record chocolates that we were able to get rates for
                                        if(shippingCostInfo.rates.length > 0){
                                            let bestShippingCost = this.getBestShippingCost(shippingCostInfo.rates);
                                            shippingCostsPerVendor[vendorUid] = shippingCostsPerVendor[vendorUid] === undefined ? 
                                                                                                                    bestShippingCost : 
                                                                                                                    shippingCostsPerVendor[vendorUid] + bestShippingCost;

                                            chocolatesWithShippingRates.push(chocolateUuid);
                                        }
                                    }
                                    catch( error ){
                                        console.log("The HTTP response returned an unanticipated response object.");
                                        console.log(error);
                                    }
                                }

                                this.setState({
                                    shippingCostsPerVendor: shippingCostsPerVendor,
                                    chocolatesWithShippingRates: chocolatesWithShippingRates
                                });
                            })
                            .catch(error => {
                                console.log("Unable to convert Shippo response objects to json format.")
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log("Unable to retrieve Shippo info.")
                        console.log(error);
                    });
                
            })
            .catch(error => {
                console.log("Unable to retrieve the proper documents from ChocolateShippingInfo collection.")
                console.log(error);
            });
    }

    getBestShippingCost(rates){
        for(var rate of rates){
            if(rate.attributes.includes("BESTVALUE")){
                return parseFloat(rate.amount);
            }
        }
    }

    getParcels(shippingInfo, quantity){
        let parcels = [];
        let currWeight = 0;
        let currHeight = 0;

        // Ensuring that one unit of the item isn't too big already
        if(
            shippingInfo.weight > this.maxParcelWeightInOunces || 
            shippingInfo.height + shippingInfo.width + shippingInfo.length > this.maxCombinedDimensions
        ){
            return [];
        }

        // Check if we can add one more item into the parcel. If not, we submit the current parcel
        // and reset the parcel's current weight and dimensions. 
        for(var i = 0; i < quantity; i++){
            if(
                currWeight + shippingInfo.weight > this.maxParcelWeightInOunces || 
                currHeight + shippingInfo.height + shippingInfo.width > this.maxCombinedDimensions
            ){
                let parcel = {
                    length: shippingInfo.length,
                    width: shippingInfo.width,
                    height: currHeight,
                    distance_unit: shippingInfo.distance_unit,
                    weight: currWeight,
                    mass_unit: shippingInfo.mass_unit
                };

                // If we're at the last item in the list, we reset the items to the original dimensions so 
                // we can pick it up in the later if-statment.
                currWeight =  i == quantity - 1 ? shippingInfo.weight : 0;
                currHeight =  i == quantity - 1 ? shippingInfo.height : 0;
                parcels.push(parcel);
            }
            else if(
                currWeight + shippingInfo.weight == this.maxParcelWeightInOunces ||
                currHeight + shippingInfo.height + shippingInfo.width == this.maxCombinedDimensions
            ){
                let parcel = {
                    length: shippingInfo.length,
                    width: shippingInfo.width,
                    height: currHeight + shippingInfo.height,
                    distance_unit: shippingInfo.distance_unit,
                    weight: currWeight + shippingInfo.weight,
                    mass_unit: shippingInfo.mass_unit
                };

                currHeight = 0;
                currWeight = 0;
                parcels.push(parcel);
            }
            else{
                currHeight += shippingInfo.height;
                currWeight += shippingInfo.weight;
            }
        }

        if(currWeight > 0 && currHeight > 0){
            let parcel = {
                length: shippingInfo.length,
                width: shippingInfo.width,
                height: currHeight,
                distance_unit: shippingInfo.distance_unit,
                weight: currWeight,
                mass_unit: shippingInfo.mass_unit
            };

            parcels.push(parcel);
        }
        
        return parcels;
    }

    // Navigate away from the page and alert the user
    handleShippingCostNotFound(){     
        Alert.alert(
            "Shipping is not available for this order.",
            "Try picking it up instead!",
            [{text: 'OK'}],
            { cancelable: false }
        );

        this.props.navigation.popToTop();
    }

    render(){
        let { 
            cartItems, 
            selectedDeliveryMethod,
            shippingAddress
        } = this.order;

        const { 
            shippingCostsPerVendor, 
            chocolatesWithShippingRates,
            taxPerVendor
        } = this.state;

        if(selectedDeliveryMethod == "shipping"){
            cartItems = this.filterOutItemsWithNoShippingCost(cartItems, chocolatesWithShippingRates);
        }

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
                    shippingCostsPerVendor={shippingCostsPerVendor}
                    taxPerVendor={taxPerVendor}
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

    filterOutItemsWithNoShippingCost(cartItems, chocolatesWithShippingRates){
        let filteredCartItems = [];

        for(let item of cartItems){
            if(chocolatesWithShippingRates.indexOf(item.chocolateUuid) > -1){
                filteredCartItems.push(item);
            }
        }

        return filteredCartItems;
    }
    
    placeOrder(){
        console.log("Place order");
    }
}
