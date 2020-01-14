import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { DeliveryMethodDisplayText } from '../../../helpers/Constants';
import { DeliveryMethodStyles } from '../styles';

export default class DeliveryMethod extends Component {

    render(){
        const { selectedDeliveryMethod } = this.props;

        return(
            <View>
                {
                    selectedDeliveryMethod == "shipping" ?
                        <View style={DeliveryMethodStyles.deliveryMethodContainer}>
                            <Text style={DeliveryMethodStyles.deliveryMethodTitle}>
                                Shipping address:
                            </Text>
                            <Text style={DeliveryMethodStyles.deliveryMethodValue}>
                                {this.getAddressString()}
                            </Text>
                        </View>
                    :
                        <View style={DeliveryMethodStyles.deliveryMethodContainer}>
                            <Text style={DeliveryMethodStyles.deliveryMethodTitle}>
                                Delivery method:
                            </Text>
                            <Text style={DeliveryMethodStyles.deliveryMethodValue}>
                                {DeliveryMethodDisplayText[selectedDeliveryMethod]}
                        </Text>
                </View>
                }
            </View>
        );
    }

    getAddressString(){
        const {
            userFullName,
            phone,
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country,
        } = this.props.shippingAddress;

        var aggregatedAddress = 
            userFullName + "\n" +
            phone + "\n" +
            streetAddress1 + "\n";
        
        if(streetAddress2 !== ""){
            aggregatedAddress =  aggregatedAddress + streetAddress2 + "\n";
        }

        aggregatedAddress = 
            aggregatedAddress + 
            city + ", " +
            state + " " +
            zipcode + "\n" +
            country;
        
        return aggregatedAddress;
    }
}
