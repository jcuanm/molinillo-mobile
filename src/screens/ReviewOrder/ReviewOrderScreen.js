import React, { Component } from 'react';
import { 
    FlatList, 
    ScrollView, 
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../helpers/Constants';
import { ReviewOrderScreenStyles } from './styles';
import PriceBreakdown from './components/PriceBreakdown';
import DeliveryMethod from './components/DeliveryMethod';

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
        const { cartItems, selectedDeliveryMethod } = this.order;
        
        return(
            <ScrollView style={ReviewOrderScreenStyles.container}> 

                <DeliveryMethod 
                    selectedDeliveryMethod={selectedDeliveryMethod} 
                />

                <PriceBreakdown 
                    cartItems={cartItems}
                    selectedDeliveryMethod={selectedDeliveryMethod}
                />

                <Text style={ReviewOrderScreenStyles.policyText}>
                    By placing your order, you agree to Molinillo's privacy policy and terms of use.
                </Text>
                <TouchableOpacity 
                    onPress={() => console.log("Enter credit card info") } 
                    style={ReviewOrderScreenStyles.proceedToCheckoutButton}
                >
                    <Text style={ReviewOrderScreenStyles.proceedToCheckoutText}>
                        Proceed to payment
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
