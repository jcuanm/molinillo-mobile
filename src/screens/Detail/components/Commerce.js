import React, { Component } from 'react';
import {
    Alert,
    Picker,
	View,
    Text,
    TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
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

		return (
            <View style={CommerceStyles.border}>
                <View style={CommerceStyles.container}>
                    <View style={CommerceStyles.column} >
                        <Text style={CommerceStyles.inStockText}>
                            In Stock
                        </Text>
                        <Text style={CommerceStyles.priceValue}> 
                            ${this.props.price.toFixed(2)}
                        </Text>

                        <View style={CommerceStyles.pickerContainer}>
                            <Text style={CommerceStyles.qtyText}>Qty:</Text>
                            <Picker 
                                selectedValue={this.state.quantity}
                                onValueChange={(itemValue, itemIndex) => this.setState({ quantity: itemValue })}
                                style={CommerceStyles.picker}
                                textStyle={CommerceStyles.pickerText}
                            >
                                {this.getPickerItems()}
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

    getPickerItems(){
        let pickerItems = [];
        for(var i = 1; i < this.numPickerItems + 1; i++){
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
            confectionName,
            imageDownloadUrl,
            vendorAddress
        } = this.props;

        let db = firebase.firestore();
        let userId = this.dbHandler.currUser.uid;
        let quantity = this.state.quantity;

        db
            .collection("Cart")
            .where("userId", "==", userId)
            .where("chocolateUuid", "==", uuid)
            .get()
            .then( doc => {

                if(doc.empty){
                    let cartRef = this.dbHandler.getRef(
                        "Cart", 
                        null, 
                        uuid);
    
                    const data = {
                        created_ts: new Date(),
                        userId: userId,
                        quantity: this.state.quantity,
                        price: price,
                        producerName: producerName,
                        confectionName: confectionName,
                        chocolateUuid: uuid,
                        barcodeData: barcodeData,
                        barcodeType: barcodeType,
                        imageDownloadUrl: imageDownloadUrl,
                        vendorAddress: vendorAddress
                    };
    
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
                        })
                        .catch( error => {
                            Alert.alert(
                                "Error adding to shopping cart",
                                "",
                                [
                                    {text: 'OK'}
                                ],
                                { cancelable: false }
                            );
                        });
                }
                else{
                    db
                        .collection("Cart")
                        .doc(userId + "_" + uuid)
                        .update({
                            quantity: firebase.firestore.FieldValue.increment(quantity)
                        });
                }
            })
            .catch( _ => {
                Alert.alert(
                    "Error adding to shopping cart",
                    "",
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            });
    }
}
