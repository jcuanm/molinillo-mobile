import React, { Component } from 'react';
import { 
    Image,
    View, 
    ScrollView,
    Text
 } from 'react-native';
 import { Colors } from '../../helpers/Constants';
 
export default class OrderHistoryScreen extends Component {
    static navigationOptions = {
        headerTintColor: Colors.Secondary,
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        title: "Order History",
    }

    getPastOrders(){
        let orderHistoryRef = firebase.firestore().collection("OrderHistory");
        let query = orderHistoryRef.where("customerId", "==", this.dbHandler.currUser.uid);

        query 
            .get()
            .then(results => {
                let pastOrders = [];

                if(results.size > 0){
                    results.forEach(doc => {

                        const { 
                            cartItems, 
                            orderTotal,
                            chocolateUuid 
                        } = doc.data();
                
                    }); 

                    this.setState({pastOrders: pastOrders})
                }
                else{
                    this.setState({pastOrders: []});
                }  
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return(
            <View style={CartScreenStyles.container}>
                <ScrollView>
                    <FlatList
                        data={cartItems}
                        scrollEnabled={true}
                        renderItem={({_, index}) => this.renderItem(cartItems[index])}
                        keyExtractor={(_, index) => index.toString()}
                    /> 

                    {
                        this.state.cartItems.length > 0 ?
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate("DeliveryMethodScreen", { cartItems: cartItems }) }
                                style={CartScreenStyles.proceedToCheckoutButton}
                            >
                                <Text style={CartScreenStyles.proceedToCheckoutText}>
                                    Proceed to checkout
                                </Text>
                            </TouchableOpacity>
                        :
                            null
                    }
                </ScrollView>

                <ActionButton
                    buttonColor={Colors.Primary}
                    icon={<Ionicons name="md-camera" size={25} color={Colors.Secondary} />}
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}