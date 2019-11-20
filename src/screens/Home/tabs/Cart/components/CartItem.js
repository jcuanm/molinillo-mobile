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
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
        this.maxStars = 5;
        this.state = {
            quantity: this.props.quantity
        }
    }

    render(){
        const { 
            navigate, 
            chocolateUuid,
            price,
            imageDownloadUrl,
            producerName,
            confectionName,
        } = this.props;

        return(
            <View style={CartItemStyles.container} >
                <Image 
                    style={CartItemStyles.image}
                    source={{ uri : imageDownloadUrl }}
                />

                <View style={CartItemStyles.itemInfoContainer}>
                    <Text style={CartItemStyles.producerName}>{producerName}</Text>
                    <Text>{confectionName}</Text>
                    <Text>${price.toFixed(2)}</Text>

                    <View style={CartItemStyles.quantityChangerContainer}>
                        <TouchableOpacity onPress={() => this.deleteItem(chocolateUuid)}>
                            <Ionicons 
                                size={32}
                                name={"md-trash"}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => this.decrement(chocolateUuid)} 
                            style={CartItemStyles.quantityChangerButton}
                        >
                            <Text style={CartItemStyles.quantityChangerSymbol}>-</Text>
                        </TouchableOpacity>
                        <View style={CartItemStyles.quantityTextContainer}>
                            <Text style={CartItemStyles.quantityText}>{this.state.quantity}</Text>
                        </View>
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
        const { quantity } = this.state;
        let cartRef = this.dbHandler.getRef("Cart", null, chocolateUuid);

        cartRef
            .update({
                quantity: firebase.firestore.FieldValue.increment(1)
            })
            .then( _ => {
                this.setState({quantity: quantity + 1});
            });
    }
}
