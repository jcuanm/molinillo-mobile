import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PriceBreakdownStyles } from '../styles';

export default class PriceBreakdown extends Component {

    render(){
        const { 
            income,
            subtotal,
            tax,
            shippingCost,
            selectedDeliveryMethod,
            vendorCommission,
        } = this.props;

        const decimalPlaces = 2;

        return(
            <View style={PriceBreakdownStyles.container}> 

                {/* Items total */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Items:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${subtotal.toFixed(decimalPlaces)}
                    </Text>
                </View>

                {/* Subtotal */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Total before tax:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        ${subtotal.toFixed(decimalPlaces)}
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
                                ${shippingCost.toFixed(decimalPlaces)}
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
                        ${tax.toFixed(decimalPlaces)}
                    </Text>
                </View>

                {/* Commission */}
                <View style={PriceBreakdownStyles.calculation}>
                    <Text style={PriceBreakdownStyles.calculationTitle}>
                        Commission:
                    </Text>
                    <Text style={PriceBreakdownStyles.calculationAmount}>
                        - ${vendorCommission.toFixed(decimalPlaces)}
                    </Text>
                </View>

                {/* Total income*/}
                <View style={[
                        PriceBreakdownStyles.calculation, 
                        PriceBreakdownStyles.orderTotalBorder
                    ]}
                >
                    <Text style={[PriceBreakdownStyles.calculationTitle, PriceBreakdownStyles.orderTotalTitle]}>
                        Total income:
                    </Text>
                    <Text style={[PriceBreakdownStyles.calculationAmount, PriceBreakdownStyles.orderTotalAmount]}>
                        ${income}
                    </Text>
                </View>
            </View>
        );
    }
}
