import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { DeliveryMethodStyles } from '../styles';

export default class DeliveryMethod extends Component {
    render(){
        const { 
            selectedDeliveryMethod, 
            shippingAddress,
            vendorAddress
        } = this.props;

        return(
            <View>
                {
                    selectedDeliveryMethod == "shipping" ?
                        <View style={DeliveryMethodStyles.deliveryMethodContainer}>
                            <Text style={DeliveryMethodStyles.deliveryMethodTitle}>
                                Shipping address:
                            </Text>
                            <Text style={DeliveryMethodStyles.deliveryMethodValue}>
                                {shippingAddress}
                            </Text>
                        </View>
                    :
                        <View style={DeliveryMethodStyles.deliveryMethodContainer}>
                            <Text style={DeliveryMethodStyles.deliveryMethodTitle}>
                                Pickup address:
                            </Text>
                            <Text style={DeliveryMethodStyles.deliveryMethodValue}>
                                {vendorAddress}
                            </Text>
                        </View>
                }
            </View>
        );
    }
}
