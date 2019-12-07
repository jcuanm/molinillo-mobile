import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PriceBreakdownStyles } from '../styles';

export default class PriceBreakdown extends Component {

    render(){
        const { cartItems, selectedDeliveryMethod } = this.props;
        const subtotal = this.calculateSubTotal(cartItems).toFixed(2);
        
        return(
            <View style={PriceBreakdownStyles.container}> 

                {/* Items total */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Items:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${subtotal}
                    </Text>
                </View>

                {/* Subtotal */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Total before tax:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${subtotal}
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
                                $Undefined
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
                        $Undefined
                    </Text>
                </View>

                {/* Service fee */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Service fee:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        $Undefined
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
                        ${subtotal}
                    </Text>
                </View>
            </View>
        );
    }

    calculateSubTotal(cartItems){
        let total = 0;

        for(var i = 0; i < cartItems.length; i++){
            let { price, quantity } = cartItems[i].key;
            let itemTotal = price * quantity;
            total = +(total + itemTotal).toFixed(2);
        }
        return total;
    }
}
