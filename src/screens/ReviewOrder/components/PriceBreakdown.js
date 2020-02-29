import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PriceBreakdownStyles } from '../styles';

export default class PriceBreakdown extends Component {

    render(){
        const { 
            cartItems, 
            selectedDeliveryMethod, 
            shippingCostsPerVendor,
            taxPerVendor,
            serviceFeeDollars,
            serviceFeePercent
        } = this.props;

        const decimalPlaces = 2;

        const totalShippingCosts = this.calculateTotal(shippingCostsPerVendor);
        const totalTax = this.round(this.calculateTotal(taxPerVendor), decimalPlaces);
        const subtotal = this.calculateSubTotal(cartItems);
        const serviceFee = this.round((subtotal * serviceFeePercent) + serviceFeeDollars, decimalPlaces);
        const finalTotal = this.round(subtotal + totalShippingCosts + totalTax + serviceFee, decimalPlaces);
        
        return(
            <View style={PriceBreakdownStyles.container}> 

                {/* Items total */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Items:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>

                {/* Subtotal */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Total before tax:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>

                {/* Shipping & handling */}
                {
                    selectedDeliveryMethod == "shipping" ?
                        <View style={PriceBreakdownStyles.calculation}>
                            <Text style={PriceBreakdownStyles.calculationTitle}>
                                Shipping & handling:
                            </Text>
                            <Text style={PriceBreakdownStyles.calculationAmount}>
                                ${totalShippingCosts.toFixed(2)}
                            </Text>
                        </View>
                    :
                        null
                }

                {/* Estimated tax */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Estimated tax:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${totalTax.toFixed(2)}
                    </Text>
                </View>

                {/* Service fee */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Service fee:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${serviceFee.toFixed(2)}
                    </Text>
                </View>

                {/* Order total */}
                <View style={[
                        PriceBreakdownStyles.calculation, 
                        PriceBreakdownStyles.orderTotalBorder
                    ]}
                >
                    <Text style={[PriceBreakdownStyles.calculationTitle, PriceBreakdownStyles.orderTotalTitle]}>
                        Order Total:
                    </Text>
                    <Text style={[PriceBreakdownStyles.calculationAmount, PriceBreakdownStyles.orderTotalAmount]}>
                        ${finalTotal.toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    }

    calculateSubTotal(cartItems){
        let total = 0;

        for(var i = 0; i < cartItems.length; i++){
            let { price, quantity } = cartItems[i];
            let itemTotal = price * quantity;
            total += itemTotal;
        }
        return total;
    }

    calculateTotal(vendorCosts){
        let total = 0;

        if(Object.keys(vendorCosts).length > 0){
            for(var vendorUid in vendorCosts){
                total += vendorCosts[vendorUid];
            }
        }
        return total;
    }

    round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
}
