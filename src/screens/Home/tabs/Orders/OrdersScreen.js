import React, { Component } from 'react';
import { 
    FlatList, 
    Image,
    ScrollView, 
    TouchableOpacity,
    View 
} from 'react-native';
import ActionButton from 'react-native-action-button';
import DbHandler from '../../../../helpers/DbHandler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import Order from "./components/Order";
import { Colors } from '../../../../helpers/Constants';
import { OrderScreenStyles } from './styles';

export default class OrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.getUserOrders = this.getUserOrders.bind(this); 

        props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
          'didFocus',
          () => { this.getUserOrders() },
        );
    }
    
    getUserOrders(){
        let ordersRef = firebase.firestore().collection("Orders");
        let query = ordersRef.where("vendorUid", "==", this.dbHandler.currUser.uid);

        query 
            .get()
            .then(results => {
                let orders = [];
                
                if(results.size > 0){
                    results.forEach(doc => {
                        orders.push(doc.data());
                    }); 

                    this.setState({orders: orders})
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Orders",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity
                onPress={() => navigation.navigate("SearchScreen")} 
                style={OrderScreenStyles.headerButton} 
            >
                <Image 
                    style={OrderScreenStyles.headerImage}
                    source={require('../../../../../assets/images/logo.png')}
                />
            </TouchableOpacity>
        ),
    })

    render(){
        const { orders } = this.state;

        return(
            <View style={OrderScreenStyles.container}>
                <ScrollView>
                    <FlatList
                        data={orders}
                        scrollEnabled={true}
                        renderItem={({_, index}) => this.renderOrder(orders[index])}
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

    renderOrder(order){
        const { 
            orderTotal, 
            serviceFee,
            vendorCommission,
            selectedDeliveryMethod,
            vendorAddress,
            shippingAddress
        } = order;
        
        let income = orderTotal - serviceFee - vendorCommission;

        return(
            <Order 
                navigate={this.props.navigation.navigate}
                selectedDeliveryMethod={selectedDeliveryMethod}
                vendorAddress={vendorAddress}
                shippingAddress={shippingAddress}
                income={income.toFixed(2)}
                order={order} 
            />
        );
    }
}
