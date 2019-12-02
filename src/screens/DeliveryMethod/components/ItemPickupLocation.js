import React, { Component } from 'react';
import { 
    Image,
    Text,
    View
} from 'react-native';
import 'firebase/firestore';
import { ItemPickupLocationStyles } from '../styles';

export default class ItemPickupLocation extends Component {

    render(){
        const {
            imageDownloadUrl,
            producerName,
            confectionName,
            vendorAddress
        } = this.props;

        return(
            <View style={ItemPickupLocationStyles.container} >
                <Image 
                    style={ItemPickupLocationStyles.image}
                    source={{ uri : imageDownloadUrl }}
                />

                <View style={ItemPickupLocationStyles.itemInfoContainer}>
                    <Text style={ItemPickupLocationStyles.importantText}>{producerName}</Text>
                    <Text>{confectionName} {"\n"}</Text>
                    <Text style={ItemPickupLocationStyles.importantText}>Pickup location:</Text>
                    <Text>{vendorAddress}</Text>
                </View>
            </View>
        );
    }
}
