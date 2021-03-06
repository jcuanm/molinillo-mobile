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
import { ShippoConfig, StripeConfig } from '../../../assets/Config';
import { Colors, PrivacyPolicyUrl, TermsAndServicesUrl } from '../../helpers/Constants';
import { ReviewOrderScreenStyles } from './styles';
import PriceBreakdown from './components/PriceBreakdown';
import DeliveryMethod from './components/DeliveryMethod';
import ReviewItem from './components/ReviewItem';
import DbHandler from '../../helpers/DbHandler';
import PaymentMethod from './components/PaymentMethod';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';

const uuidv4 = require('uuid/v4');
var stripe = require('stripe-client')(StripeConfig.apiKey);


export default class ReviewOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.maxParcelWeightInOunces = 2400; // According to UPS
        this.maxCombinedDimensions = 108; // length + width + height (According to UPS)
        this.order = this.props.navigation.getParam('order', {});
        this.billingInfo = this.props.navigation.getParam('billingInfo', {});
        this.decimalPlaces = 2;
        this.numExpectedRequests = this.order.selectedDeliveryMethod == "shipping" ? 3 : 2;
        this.hasSwipedRight = false;

        this.state = {
            numRequestsFinished: 0,
            shippingCostsPerVendor: {},
            chocolatesWithTaxRates: [],
            chocolatesWithShippingRates: [],
            taxPerVendor: {},
            serviceFeePercent: 0,
            serviceFeeDollars: 0,
            vendorCommissionPercent: 0
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

        this.getTaxRates();
        this.getCommissionRates();
        
        if(selectedDeliveryMethod == "shipping" && shippingAddress !== undefined){
            this.getShippingCosts();
        }
    }

    getCommissionRates(){
        let miscValuesCommerceRef = this.dbHandler.getRef("Commerce");

        miscValuesCommerceRef
            .get()
            .then(results => {
                if(results.exists){
                    const { 
                        serviceFeeDollars, 
                        serviceFeePercent,
                        vendorCommissionPercent
                    } = results.data();

                    this.setState({
                        numRequestsFinished: this.state.numRequestsFinished + 1,
                        serviceFeeDollars: serviceFeeDollars,
                        serviceFeePercent: serviceFeePercent,
                        vendorCommissionPercent: vendorCommissionPercent
                    });
                }
            })
            .catch(error => {
                console.log("Error getting the Commerce doc from the MiscValues collection");
                console.log(error);
            });
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
                                                                this.round(totalTax, this.decimalPlaces) : 
                                                                this.round(taxPerVendor[vendorUid] + totalTax, this.decimalPlaces);
                        chocolatesWithTaxRates.push(chocolateUuid);
                    }
                }

                this.setState({ 
                    numRequestsFinished: this.state.numRequestsFinished + 1,
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
                                    numRequestsFinished: this.state.numRequestsFinished + 1,
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

    render(){
        let { 
            cartItems, 
            selectedDeliveryMethod,
            shippingAddress
        } = this.order;

        const { 
            shippingCostsPerVendor, 
            chocolatesWithShippingRates,
            taxPerVendor,
            serviceFeeDollars,
            serviceFeePercent,
            numRequestsFinished
        } = this.state;

        if(selectedDeliveryMethod == "shipping"){
            cartItems = this.filterOutItemsWithNoShippingCost(cartItems, chocolatesWithShippingRates);
        }

        const { nameOnCard, creditCardNumber } = this.billingInfo;
        
        return(
            
            <View >
                { 
                    numRequestsFinished < this.numExpectedRequests ?
                    
                        <Text style={ReviewOrderScreenStyles.loadingText}>Loading...</Text>

                    :

                        <ScrollView style={ReviewOrderScreenStyles.container}> 
                            <View>
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
                                    serviceFeeDollars={serviceFeeDollars}
                                    serviceFeePercent={serviceFeePercent}
                                />

                                <Text style={ReviewOrderScreenStyles.policyText}>
                                    By placing your order, you agree to Molinillo's <Text 
                                        onPress={() => this.openWebpage(PrivacyPolicyUrl)} 
                                        style={ReviewOrderScreenStyles.policyLink}>
                                            privacy policy
                                    </Text> and <Text 
                                        onPress={() => this.openWebpage(TermsAndServicesUrl)} 
                                        style={ReviewOrderScreenStyles.policyLink}>
                                            terms of use
                                    </Text> as outlined on our website. All sales are final after being placed.
                                </Text>

                                <RNSlidingButton
                                    style={ReviewOrderScreenStyles.finalizeSlider}
                                    height={40}
                                    onSlidingSuccess={() => this.createStripeCustomer(cartItems)}
                                    slideDirection={SlideDirection.RIGHT}
                                >
                                    <Text style={ReviewOrderScreenStyles.finalizeText}>
                                        Slide right to place order >
                                    </Text>
                                </RNSlidingButton>
                            </View>
                    
                        </ScrollView>
                }
            </View>
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

    getVendorInfo(cartItems){
        let vendorInfo = {};

        for(var item of cartItems){
            if(item.vendorUid in vendorInfo){
                vendorInfo[item.vendorUid].cartItems.push(item);
            }
            else{
                vendorInfo[item.vendorUid] = {
                    producerName: item.producerName,
                    customerId: item.customerId,
                    vendorAddress: item.vendorAddress,
                    cartItems: [item],
                    vendorEmail: item.vendorEmail
                };
            }
        }

        return vendorInfo;
    }

    getAddressString(shippingAddress){
        const {
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country,
        } = shippingAddress;

        var aggregatedAddress = streetAddress1 + " ";
        
        if(streetAddress2 !== ""){
            aggregatedAddress =  aggregatedAddress + streetAddress2 + " ";
        }

        aggregatedAddress = 
            aggregatedAddress + 
            city + ", " +
            state + " " +
            zipcode + ", " +
            country;
        
        return aggregatedAddress;
    }

    calculateVendorSubTotal(cartItems){
        let total = 0;

        for(var i = 0; i < cartItems.length; i++){
            let { price, quantity } = cartItems[i];
            let itemTotal = price * quantity;
            total += itemTotal;
        }
        return total;
    }

    createStripeCustomer(cartItems){
       if(cartItems.length <= 0){
            console.log(cartItems);

            Alert.alert(
                "Your cart is empty.",
                "Please try refreshing the app.",
                [{text: 'OK'}],
                { cancelable: false }
            );
        }
        else if(this.hasSwipedRight){
            // Don't do anything if an order is currently being processed
            return;
        }
        else{
            this.hasSwipedRight = true;

            const {
                creditCardNumber,
                expirationMonth,
                expirationYear,
                cvc,
                nameOnCard,
                city,
                country,
                streetAddress1,
                streetAddress2,
                state,
                zipcode
            } = this.billingInfo;

            let cardInfo = {
                card: {
                    number: creditCardNumber,
                    exp_month: expirationMonth,
                    exp_year: expirationYear,
                    cvc: cvc,
                    name: nameOnCard,
                    address_line1: streetAddress1,
                    address_line2: streetAddress2,
                    address_city: city,
                    address_zip: zipcode,
                    address_state: state,
                    address_country: country
                }
            };

            // Create Stripe token
            stripe
                .createToken(cardInfo)
                .then(token => {
                    
                    // Use Stripe token to create a customer to charge later
                    let request = this.makePOSTRequest(
                        "https://api.stripe.com/v1/customers", 
                        this.getPostBody(token.id), 
                        apiKey=StripeConfig.apiKey
                    );

                    request
                        .then(response => {
                            let jsonRequest = response.json();

                            // Add transaction metadata to Orders collection if Stripe processes successful
                            jsonRequest
                                .then(customer => {
                                    this.addToOrdersCollection(cartItems, customer.id);

                                    Alert.alert(
                                        "Your order request has been placed!",
                                        "Once the vendor confirms the order, we will charge your card and notify you.",
                                        [{text: 'OK'}],
                                        { cancelable: false }
                                    );
                                })
                                .catch(error => {
                                    this.hasSwipedRight = false;
                                    console.log("Error converting response to JSON object.");
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            this.alertCouldNotConnect();
                            this.hasSwipedRight = false;
                            console.log("Error trying to create Stripe customer object.");
                            console.log(error);
                        });

                })
                .catch(error => {
                    this.alertCouldNotConnect();
                    this.hasSwipedRight = false;
                    console.log("Error retrieving Stripe token.");
                    console.log(error);
                });
        }
    }

    addToOrdersCollection(cartItems, stripeCustomerId){
        if(!stripeCustomerId){
            Alert.alert(
                "Invalid payment info supplied.",
                "Please return to the payment screen and enter valid payment credentials.",
                [{text: 'OK'}],
                { cancelable: false }
            );
            this.hasSwipedRight = false;
            return;
        }

        let vendorInfo = this.getVendorInfo(cartItems);
        const { selectedDeliveryMethod, shippingAddress } = this.order;
        let ordersPerVendor = [];
       
        // Collect order metadata for each vendor included in the transaction
        for(let vendorUid in vendorInfo){
            let subtotal = this.calculateVendorSubTotal(vendorInfo[vendorUid].cartItems);
            let tax = this.state.taxPerVendor[vendorUid];
            let shippingCost = selectedDeliveryMethod == "shipping" ? this.state.shippingCostsPerVendor[vendorUid] : 0;
            let serviceFee = this.round((subtotal * this.state.serviceFeePercent) + this.state.serviceFeeDollars, this.decimalPlaces);
            let orderTotal = subtotal + tax + shippingCost + serviceFee; 

            let orderPerVendor = {
                vendorUid: vendorUid,
                customerId: vendorInfo[vendorUid].customerId,
                producerName: vendorInfo[vendorUid].producerName,
                vendorAddress: vendorInfo[vendorUid].vendorAddress,
                timeOrderExecuted: new Date(),
                phone: this.billingInfo.phone,
                selectedDeliveryMethod: selectedDeliveryMethod,
                stripeCustomerId: stripeCustomerId,
                orderUuid: uuidv4(),
                tax: tax,
                shippingAddress: selectedDeliveryMethod == "shipping" ? this.getAddressString(shippingAddress) : "",
                serviceFee: serviceFee,
                shippingCost: shippingCost,
                subtotal: subtotal,
                cartItems: JSON.stringify(vendorInfo[vendorUid].cartItems),
                orderTotal: this.round(orderTotal, this.decimalPlaces),
                vendorCommission: this.round((this.state.vendorCommissionPercent * orderTotal) - serviceFee, this.decimalPlaces),
                customerEmail: this.dbHandler.currUser.email,
                vendorEmail: vendorInfo[vendorUid].vendorEmail,

                // These values will be set after the vendor confirms/declines the order
                stripeTransactionId: null,
                receipt_number: null,
                receiptUrl: null,
                timeConfirmed: null,
                declinationReason: "",
                orderState: "pending"
            };

            ordersPerVendor.push(orderPerVendor);
       }

       // Batch insert the orders into Firesbase
       let batchCursor = this.dbHandler.dbRef.batch();
                        
        for(var i = 0; i < ordersPerVendor.length; i++){
            let orderUuid = ordersPerVendor[i].orderUuid;
            let ordersRef = this.dbHandler.getRef("Orders", barcode=null, chocolateUuid=null, commentUuid=null, orderUuid=orderUuid);

            batchCursor.set(ordersRef, ordersPerVendor[i]);
        }

        batchCursor
            .commit()
            .then( _ => {
                this.clearShoppingCart();
                this.props.navigation.popToTop();
                this.props.navigation.navigate("SearchScreen");
                this.hasSwipedRight = false;
            })
            .catch(error => {
                Alert.alert(
                    "There was an error processing your order",
                    "",
                    [{text: 'OK'}],
                    { cancelable: false }
                );

                this.hasSwipedRight = false;
                console.log("Failed to commit order");
                console.log(error);
            });
    }

    alertCouldNotConnect(){
        Alert.alert(
            "There was an issue connecting to the database.",
            "",
            [{text: 'OK'}],
            { cancelable: false }
        );
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

    getPostBody(tokenId){
        return("description=" + "customer_" + this.dbHandler.currUser.uid + "&" + "source=" + tokenId);
    }

    clearShoppingCart(){
        let cartRef = this.dbHandler.dbRef.collection("Cart");

        cartRef
            .where("customerId", "==", this.dbHandler.currUser.uid)
            .get()
            .then(results => {
                let batchRef = this.dbHandler.dbRef.batch();

                results.forEach(doc => {
                    batchRef.delete(doc.ref);
                });

                batchRef.commit()
            });
    }

    round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
}
