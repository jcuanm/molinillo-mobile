import React, { Component } from 'react';
import { 
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from '../../../../../helpers/DbHandler';
import { CartItemStyles } from '../styles';

export default class CartItem extends Component {
    dbHandler = new DbHandler();
    state = {
        quantity: this.props.quantity
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.quantity !== this.props.quantity){
            this.setState({quantity:nextProps.quantity});
        }
    }

    render(){
        const { 
            chocolateUuid,
            price,
            imageDownloadUrl,
            producerName,
            confectionName
        } = this.props;

        return(
            <View style={CartItemStyles.container} >
                <Image 
                    style={CartItemStyles.chocolateImage}
                    source={{ uri : imageDownloadUrl }}
                />

                <View style={CartItemStyles.itemInfoContainer}>
                    <Text style={CartItemStyles.producerName}>{producerName}</Text>
                    <Text>{confectionName}</Text>
                    <Text>${price.toFixed(2)}</Text>

                    <View style={CartItemStyles.quantityChangerContainer}>
                        <TouchableOpacity 
                            style={CartItemStyles.trashIcon} 
                            onPress={() => this.deleteItem(chocolateUuid)}
                        >
                            <Ionicons 
                                size={28}
                                name={"md-trash"}
                            />
                        </TouchableOpacity>
                        
                        {/* Decrementer */}
                        <TouchableOpacity 
                            onPress={() => this.decrement(chocolateUuid)} 
                            style={CartItemStyles.quantityChangerButton}
                        >
                            <Text style={CartItemStyles.quantityChangerSymbol}>-</Text>
                        </TouchableOpacity>

                        {/* Quantity */}
                        <View style={CartItemStyles.quantityTextContainer}>
                            <Text style={CartItemStyles.quantityText}>{this.state.quantity}</Text>
                        </View>

                        {/* Incrementer */}
                        <TouchableOpacity 
                            onPress={() => this.increment(chocolateUuid)} 
                            style={CartItemStyles.quantityChangerButton}
                        >
                            <Text style={CartItemStyles.quantityChangerSymbol}>+</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        );
    }

    deleteItem(chocolateUuid){
        let cartRef = this.dbHandler.getRef("Cart", null, chocolateUuid);

        cartRef
            .delete()
            .then( _ => {
                // Refresh the Cart Screen after deleting
                this.props.getUserCartItems();
            });
    }

    decrement(chocolateUuid){
        const { quantity } = this.state;

        if(quantity <= 1){
           this.deleteItem(chocolateUuid);
        }
        else{
            let cartRef = this.dbHandler.getRef("Cart", null, chocolateUuid);
            cartRef
                .update({
                    quantity: firebase.firestore.FieldValue.increment(-1)
                })
                .then( _ => {
                    this.setState({quantity: quantity - 1});
                });
        }
    }

    increment(chocolateUuid){
        let cartRef = this.dbHandler.getRef("Cart", null, chocolateUuid);

        cartRef
            .update({
                quantity: firebase.firestore.FieldValue.increment(1)
            })
            .then( _ => {
                this.setState({quantity: this.state.quantity + 1});
            });
    }
}
