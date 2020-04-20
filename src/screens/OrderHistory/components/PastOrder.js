import React, { Component } from 'react';
import { Text, View } from 'react-native';
import 'firebase/firestore';
import { Colors } from '../../../helpers/Constants';
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
            vendorAddress,
            timeOrderExecuted
        } = this.props;

        let stateColor = this.getStateColor(orderState);
        let numCartItems = Object.keys(JSON.parse(cartItems)).length;
        let formattedDateOrderPlaced = this.getFormattedDateFromTimestamp(timeOrderExecuted);

        return(
            <View style={PastOrderStyles.container}>
                <View style={PastOrderStyles.orderInfoContainer}>
                    <Text style={[PastOrderStyles.title, {fontWeight:'bold', color:Colors.Primary}]}>
                        Total
                    </Text>
                    <Text style={PastOrderStyles.title}>${orderTotal}{"\n"}</Text>

                    <Text style={[PastOrderStyles.title, {fontWeight:'bold', color:Colors.Primary}]}>
                        Status
                    </Text>
                    <Text style={[PastOrderStyles.title, {color:stateColor}]}>
                        {orderState.charAt(0).toUpperCase() + orderState.substring(1)}
                    </Text>
                </View>
                
                <View style={PastOrderStyles.orderInfoContainer}>
                    <Text style={PastOrderStyles.orderInfoSubtitle}>Vendor:</Text>
                    <Text>{producerName}{"\n"}</Text>

                    <Text style={PastOrderStyles.orderInfoSubtitle}>Receipt #:</Text>
                    <Text>{receiptNumber}{"\n"}</Text>

                    <Text style={PastOrderStyles.orderInfoSubtitle}>Number of items:</Text>
                    <Text>{numCartItems}{"\n"}</Text>

                    {selectedDeliveryMethod == "shipping" ? 

                        <View>
                            <Text style={PastOrderStyles.orderInfoSubtitle}>Delivery method:</Text>
                            <Text>Shipping{"\n"}</Text>

                            <Text style={PastOrderStyles.orderInfoSubtitle}>From address:</Text>
                            <Text>{vendorAddress}{"\n"}</Text>

                            <Text style={PastOrderStyles.orderInfoSubtitle}>To address:</Text>
                            <Text>{shippingAddress}{"\n"}</Text>
                        </View>
                        
                    :
                        <View>
                            <Text style={PastOrderStyles.orderInfoSubtitle}>Delivery method:</Text>
                            <Text>Pickup{"\n"}</Text>

                            <Text style={PastOrderStyles.orderInfoSubtitle}>Address:</Text>
                            <Text>{vendorAddress}{"\n"}</Text>
                        </View>
                    }

                    <Text style={PastOrderStyles.orderInfoSubtitle}>Date order placed:</Text>
                    <Text>{formattedDateOrderPlaced}</Text>

                </View>
            </View>
        );
    }

    getStateColor(orderState){
        if(orderState == "confirmed"){
            var stateColor = "green";
        }
        else if(orderState == "declined"){
            var stateColor = "red";
        }
        else if(orderState == "pending"){
            var stateColor = "grey";
        }
        else{
            var stateColor = "black";
        }

        return stateColor;
    }

    getFormattedDateFromTimestamp(timestamp){
        let date = new Date(timestamp.seconds * 1000);
        return date.toString()
    }
}
