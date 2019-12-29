import React, { Component } from 'react';
import { 
    FlatList, 
    Image,
    ScrollView, 
    Text,
    TouchableOpacity,
    View 
} from 'react-native';
import ActionButton from 'react-native-action-button';
import DbHandler from '../../../../helpers/DbHandler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import CartItem from "./components/CartItem";
import { Colors } from '../../../../helpers/Constants';
import { CartScreenStyles } from './styles';
import Barcode from '../../../../helpers/Barcode';
import { StringConcatenations } from '../../../../helpers/Constants';

export default class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.getUserCartItems = this.getUserCartItems.bind(this); 

        props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        this.state = {
            cartItems: []
        }
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
          'didFocus',
          () => { this.getUserCartItems() },
        );
    }
    
    getUserCartItems(){
        let cartRef = firebase.firestore().collection("Cart");
        let query = cartRef.where("userId", "==", this.dbHandler.currUser.uid);

        query 
            .get()
            .then(results => {
                let cartItems = [];
                if(results.size > 0){
                    results.forEach(doc => {

                        const { 
                            barcodeData, 
                            barcodeType, 
                            chocolateUuid 
                        } = doc.data();
                
                        let barcode = new Barcode(barcodeType, barcodeData);
                        let barcodeTypeRef = this.dbHandler.getRef(
                            StringConcatenations.Prefix, 
                            barcode,
                            chocolateUuid);

                        // Getting the price of each item
                        barcodeTypeRef
                            .get()
                            .then(result => {
                                if(result.exists){
                                    let item = {
                                        ...doc.data(),
                                        price: result.data().price
                                    }
                                    this.setState({cartItems: [...this.state.cartItems, item]});
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }); 

                    this.setState({cartItems: cartItems})
                }
                else{
                    this.setState({cartItems: []});
                }  
            })
            .catch(error => {
                console.log(error);
            });
    }

    static navigationOptions = ({ navigation }) => ({
        title: "My Cart",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity
                onPress={() => navigation.navigate("SearchScreen")} 
                style={CartScreenStyles.headerButton} 
            >
                <Image 
                    style={CartScreenStyles.headerImage}
                    source={require('../../../../../assets/images/logo.png')}
                />
            </TouchableOpacity>
        ),
    })

    render(){
        const { cartItems } = this.state;
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

    renderItem(item){
        const { 
            imageDownloadUrl,
            producerName,
            confectionName,
            quantity, 
            chocolateUuid,
            barcodeType,
            barcodeData,
            price
        } = item;

        return(
            <CartItem 
                getUserCartItems={this.getUserCartItems}
                chocolateUuid={chocolateUuid}
                imageDownloadUrl={imageDownloadUrl}
                producerName={producerName}
                confectionName={confectionName}
                quantity={quantity} 
                barcodeData={barcodeData}
                barcodeType={barcodeType}
                price={price}
            />
        );
    }
}
