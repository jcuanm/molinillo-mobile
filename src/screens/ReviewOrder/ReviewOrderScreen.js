import React, { Component } from 'react';
import { 
    FlatList, 
    Linking,
    ScrollView, 
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, PrivacyPolicyUrl } from '../../helpers/Constants';
import { ReviewOrderScreenStyles } from './styles';
import PriceBreakdown from './components/PriceBreakdown';
import DeliveryMethod from './components/DeliveryMethod';
import ReviewItem from './components/ReviewItem';

export default class ReviewOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.order = this.props.navigation.getParam('order', {});
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

    render(){
        const { 
            cartItems, 
            selectedDeliveryMethod,
            shippingAddress
        } = this.order;
        
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

                <PriceBreakdown 
                    cartItems={cartItems}
                    selectedDeliveryMethod={selectedDeliveryMethod}
                />

                <Text style={ReviewOrderScreenStyles.policyText}>
                    By placing your order, you agree to Molinillo's <Text 
                        onPress={() => this.openWebpage(PrivacyPolicyUrl)} 
                        style={ReviewOrderScreenStyles.policyLink}>
                            privacy policy
                    </Text> and terms of use.
                </Text>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("PaymentScreen", { order: this.order }) } 
                    style={ReviewOrderScreenStyles.proceedToPaymentButton}
                >
                    <Text style={ReviewOrderScreenStyles.proceedToPaymentText}>
                        Proceed to payment
                    </Text>
                </TouchableOpacity>
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
        } = item.key;

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
