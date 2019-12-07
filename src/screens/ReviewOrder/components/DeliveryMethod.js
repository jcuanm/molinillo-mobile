import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { DeliveryMethodDisplayText } from '../../../helpers/Constants';
import { DeliveryMethodStyles } from '../styles';

export default class DeliveryMethod extends Component {

    render(){
        const { selectedDeliveryMethod } = this.props;
        
        return(
            <View style={DeliveryMethodStyles.deliveryMethodContainer}>
                <Text style={DeliveryMethodStyles.deliveryMethodTitle}>
                    Delivery method:
                </Text>
                <Text style={DeliveryMethodStyles.deliveryMethodValue}>
                    {DeliveryMethodDisplayText[selectedDeliveryMethod]}
                </Text>
            </View>
        );
    }
}
