import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PaymentMethodStyles } from '../styles';

export default class PaymentMethod extends Component {

    render(){
        let { nameOnCard, creditCardNumber } = this.props;

        // Removing spaces on the end
        creditCardNumber = creditCardNumber.trim(); 

        return(
            <View style={PaymentMethodStyles.container}> 
                <View style={PaymentMethodStyles.paymentMethod}>
                    <Text style={PaymentMethodStyles.paymentMethodTitle}>
                        Name on card:
                    </Text>
                    <Text style={PaymentMethodStyles.lastFourDigits}>
                        {nameOnCard}
                    </Text>
                </View>

                <View style={PaymentMethodStyles.paymentMethod}>
                    <Text style={PaymentMethodStyles.paymentMethodTitle}>
                        Card number:
                    </Text>
                    <Text style={PaymentMethodStyles.lastFourDigits}>
                        ****-****-****-{creditCardNumber.substr(creditCardNumber.length - 4)}
                    </Text>
                </View>
            </View>
        );
    }
}
