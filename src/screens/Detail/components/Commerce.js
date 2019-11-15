import React, { Component } from 'react';
import {
    Alert,
    Picker,
	View,
    Text,
    TouchableOpacity
} from 'react-native';
import DbHandler from '../../../helpers/DbHandler';
import { CommerceStyles } from '../styles';

export default class Commerce extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.numPickerItems = 30;

		this.state = {
			quantity: 1
		};
    }

	render() {
        const { numStarRatings, sumRatings } = this.props;

		return (
            <View style={CommerceStyles.border}>
                <View style={CommerceStyles.container}>
                    <View style={CommerceStyles.column} >
                        <Text style={CommerceStyles.inStockText}>
                            In Stock: {numStarRatings}
                        </Text>
                        <Text style={CommerceStyles.priceValue}> 
                            ${(sumRatings / numStarRatings) ? (sumRatings / numStarRatings).toFixed(2) : " "}
                        </Text>

                        <View style={CommerceStyles.pickerContainer}>
                            <Text style={CommerceStyles.qtyText}>Qty:</Text>
                            <Picker 
                                selectedValue={this.state.quantity}
                                onValueChange={(itemValue, itemIndex) => this.setState({ quantity: itemValue })}
                                style={CommerceStyles.picker}
                                textStyle={CommerceStyles.pickerText}
                            >
                                {this.getPickerItems(this.numPickerItems)}
                            </Picker>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.addToCart()} style={CommerceStyles.button}>
                    <Text style={CommerceStyles.buttonText}>
                        Add to cart
                    </Text>
                </TouchableOpacity>
            </View>
		);
    }

    getPickerItems(numPickerItems){
        let pickerItems = [];
        for(var i = 1; i < numPickerItems + 1; i++){
            pickerItems.push(
                <Picker.Item key={i} label={i.toString()} value={i} />
            );
        }
        return pickerItems;
    }

    addToCart(){

        const { 
            barcodeType, 
            barcodeData, 
            uuid,
            price,
            producerName,
            confectionName 
        } = this.props;

        const data = {
            created_ts: new Date(),
            userId: this.dbHandler.currUser.uid,
            quantity: this.state.quantity,
            price: 10.00,
            producerName: producerName,
            confectionName: confectionName,
            chocolateUuid: uuid,
            barcodeData: barcodeData,
            barcodeType: barcodeType
        };


        let cartRef = this.dbHandler.getRef(
            "Cart", 
            null, 
            uuid);

        cartRef
            .set(data)
            .then( _ => {
                Alert.alert(
                    "Added to shopping cart",
                    "",
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            });
    }
}
