import React, { Component } from 'react';
import { 
    Text,
    View
} from 'react-native';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { PastOrderStyles } from '../styles';

export default class PastOrder extends Component {

    render(){
        const { 
            cartItems,
            receiptNumber,
            orderState,
            orderTotal, 
            selectedDeliveryMethod,
            producerName,
            shippingAddress,
            vendorAddress
        } = this.props;

        return(
            <View style={PastOrderStyles.container} >
                <View style={PastOrderStyles.orderInfoContainer}>
                    <Text style={PastOrderStyles.incomeTitle}>Total</Text>
                    <Text style={PastOrderStyles.incomeAmount}>${orderTotal}</Text>
                </View>
                
                {selectedDeliveryMethod == "shipping" ? 
                    <View style={PastOrderStyles.orderInfoContainer}>
                        <Text style={PastOrderStyles.orderInfoSubtitle}>Delivery Method:</Text>
                        <Text>Shipping {"\n"}</Text>

                        <Text style={PastOrderStyles.orderInfoSubtitle}>From address:</Text>
                        <Text>{vendorAddress} {"\n"}</Text>

                        <Text style={PastOrderStyles.orderInfoSubtitle}>To address:</Text>
                        <Text>{shippingAddress}</Text>
                    </View>
                :
                    <View style={PastOrderStyles.orderInfoContainer}>
                        <Text style={PastOrderStyles.orderInfoSubtitle}>Delivery Method:</Text>
                        <Text>Pickup {"\n"}</Text>

                        <Text style={PastOrderStyles.orderInfoSubtitle}>Address:</Text>
                        <Text>{vendorAddress} {"\n"}</Text>
                    </View>
                }
                
            </View>
        );
    }
}
