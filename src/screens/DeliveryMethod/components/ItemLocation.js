import React, { Component } from 'react';
import { 
    Image,
    Text,
    View
} from 'react-native';
import 'firebase/firestore';
import { ItemLocationStyles } from '../styles';

export default class ItemLocation extends Component {

    render(){
        const {
            imageDownloadUrl,
            producerName,
            confectionName,
            vendorAddress
        } = this.props;

        return(
            <View style={ItemLocationStyles.container} >
                <Image 
                    style={ItemLocationStyles.image}
                    source={{ uri : imageDownloadUrl }}
                />

                <View style={ItemLocationStyles.itemInfoContainer}>
                    <Text style={ItemLocationStyles.importantText}>{producerName}</Text>
                    <Text>{confectionName} {"\n"}</Text>
                    <Text style={ItemLocationStyles.importantText}>Pickup location:</Text>
                    <Text>{vendorAddress}</Text>
                </View>
            </View>
        );
    }
}
