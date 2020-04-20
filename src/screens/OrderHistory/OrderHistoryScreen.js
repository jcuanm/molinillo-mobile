import React, { Component } from 'react';
import { 
    FlatList,
    View, 
    ScrollView
} from 'react-native';
import PastOrder from "./components/PastOrder";
import ActionButton from 'react-native-action-button';
import DbHandler from '../../helpers/DbHandler';
import { Colors } from '../../helpers/Constants';
import { OrderHistoryScreenStyles } from './styles';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

 
export default class OrderHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.getPastOrders = this.getPastOrders.bind(this); 

        props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        this.state = {
            pastOrders: []
        }
    }

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

    componentDidMount() {
         this.getPastOrders();
    }

    getPastOrders(){
        let orderHistoryRef = firebase.firestore().collection("Orders");
        let query = orderHistoryRef.where("customerId", "==", this.dbHandler.currUser.uid);

        query 
            .get()
            .then(results => {
                let pastOrders = [];

                if(results.size > 0){
                    results.forEach(doc => {
                        pastOrders.push(doc.data());
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
        const { pastOrders } = this.state;
        return(
            <View style={OrderHistoryScreenStyles.container}>
                <ScrollView>
                    <FlatList
                        data={pastOrders}
                        scrollEnabled={true}
                        renderItem={({_, index}) => this.renderPastOrder(pastOrders[index])}
                        keyExtractor={(_, index) => index.toString()}
                    /> 
                </ScrollView>

                <ActionButton
                    buttonColor={Colors.Primary}
                    icon={<Ionicons name="md-camera" size={25} color={Colors.Secondary} />}
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }

    renderPastOrder(pastOrder){
        const { 
            cartItems,
            receiptNumber,
            orderState,
            orderTotal, 
            selectedDeliveryMethod,
            producerName,
            shippingAddress,
            vendorAddress,
        } = pastOrder;

        return(
            <PastOrder 
                getUserCartItems={this.getUserCartItems}
                selectedDeliveryMethod={selectedDeliveryMethod}
                cartItems={cartItems}
                receiptNumber={receiptNumber}
                orderState={orderState}
                orderTotal={orderTotal} 
                shippingAddress={shippingAddress}
                producerName={producerName}
                vendorAddress={vendorAddress}
            />
        );
    }
}