import React, { Component } from 'react';
import { 
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { OrderStyles } from '../styles';

export default class Order extends Component {
    render(){
        const { 
            income, 
            order,
            vendorAddress,
            shippingAddress,
            selectedDeliveryMethod
        } = this.props;

        return(
            <TouchableOpacity style={OrderStyles.container} >
                <View style={OrderStyles.orderInfoContainer}>
                    <Text style={OrderStyles.incomeTitle}>Income</Text>
                    <Text style={OrderStyles.incomeAmount}>${income}</Text>
                </View>
                
                {selectedDeliveryMethod == "shipping" ? 
                    <View style={OrderStyles.orderInfoContainer}>
                        <Text style={OrderStyles.orderInfoSubtitle}>Delivery Method:</Text>
                        <Text>Shipping {"\n"}</Text>

                        <Text style={OrderStyles.orderInfoSubtitle}>From address:</Text>
                        <Text>{vendorAddress} {"\n"}</Text>

                        <Text style={OrderStyles.orderInfoSubtitle}>To address:</Text>
                        <Text>{shippingAddress}</Text>
                    </View>
                :
                    <View style={OrderStyles.orderInfoContainer}>
                        <Text style={OrderStyles.orderInfoSubtitle}>Delivery Method:</Text>
                        <Text>Pickup {"\n"}</Text>

                        <Text style={OrderStyles.orderInfoSubtitle}>Address:</Text>
                        <Text>{vendorAddress} {"\n"}</Text>
                    </View>
                }
                
            </TouchableOpacity>
        );
    }
}
