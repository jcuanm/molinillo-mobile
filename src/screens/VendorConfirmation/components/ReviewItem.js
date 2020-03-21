import React, { Component } from 'react';
import { 
    Image,
    Text,
    View
} from 'react-native';
import 'firebase/firestore';
import { ReviewItemStyles } from '../styles';

export default class ReviewItem extends Component {

    render(){
        const {
            selectedDeliveryMethod,
            imageDownloadUrl,
            producerName,
            confectionName,
            vendorAddress,
            quantity,
            price
        } = this.props;

        return(
            <View style={ReviewItemStyles.container} >
                <Image 
                    style={ReviewItemStyles.image}
                    source={{ uri : imageDownloadUrl }}
                />

                <View style={ReviewItemStyles.itemInfoContainer}>
                    <Text style={ReviewItemStyles.importantText}>{producerName}</Text>
                    <Text>{confectionName} {"\n"}</Text>

                    {
                        selectedDeliveryMethod == "pickup" ?
                            <View>
                                <Text style={ReviewItemStyles.importantText}>Pickup location:</Text>
                                <Text>{vendorAddress} {"\n"}</Text>
                            </View>
                        :
                            null
                    }
                   
                    <Text style={ReviewItemStyles.importantText}>
                        Qty: <Text style={ReviewItemStyles.quantityAmountText}>{quantity}</Text>
                    </Text>
                    <Text style={ReviewItemStyles.priceText}>${price.toFixed(2)}</Text>
                </View>
            </View>
        );
    }
}
