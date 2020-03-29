import React, { Component } from 'react';
import { 
    Alert,
    FlatList, 
    Picker,
    Platform,
    ScrollView, 
    Text,
    TouchableOpacity,
    View 
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { ShippoConfig } from '../../../assets/Config';
import { Colors, DeliveryMethodDisplayText } from '../../helpers/Constants';
import { DeliveryMethodScreenStyles } from './styles';
import ItemPickupLocation from './components/ItemPickupLocation';
import ShippingAddressInput from './components/ShippingAddressInput';

export default class DeliveryMethodScreen extends Component {
    constructor(props) {
        super(props);
        this.cartItems = this.props.navigation.getParam('cartItems', {});
        this.updateAddress = this.updateAddress.bind(this); 

        this.state = {
            selectedDeliveryMethod: "pickup",
            isIosDialogVisible: false,

            // Delivery Address info
            userFullName: "",
            phone: "",
            streetAddress1: "",
            streetAddress2: "",
            city: "",
            state: "AL",
            zipcode: "",
            country: "United States",
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Delivery Method",
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.popToTop()} style={DeliveryMethodScreenStyles.headerButton}>
                <Ionicons 
                    name="md-arrow-back" 
                    size={25} 
                    color={Colors.Secondary} 
                />
            </TouchableOpacity>
        )
    })

    render(){
        const { 
            selectedDeliveryMethod,
            userFullName,
            phone,
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country,
        } = this.state;

        return(
            <ScrollView>
                <View style={DeliveryMethodScreenStyles.pickerContainer}>
                    <Text style={DeliveryMethodScreenStyles.promptText}>Select your delivery method</Text>

                    {
                        Platform.OS == "ios" ?
                            this.renderIosPicker()
                        :
                            <Picker 
                                selectedValue={selectedDeliveryMethod}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedDeliveryMethod: itemValue })}
                                style={DeliveryMethodScreenStyles.picker}
                                mode={"dropdown"}
                            >
                                <Picker.Item label={"Pickup"} value={"pickup"} />
                                <Picker.Item label={"Shipping"} value={"shipping"} />
                            </Picker>
                    }
                    
                </View>

                {
                    selectedDeliveryMethod == "pickup" ?
                        <FlatList
                            data={this.cartItems}
                            scrollEnabled={true}
                            renderItem={({_, index}) => this.renderItem(this.cartItems[index])}
                            keyExtractor={(_, index) => index.toString()}
                        /> 
                    :
                        null
                }

                {
                    selectedDeliveryMethod == "shipping" ?
                        <ShippingAddressInput 
                            updateAddress={this.updateAddress}
                            userFullName={userFullName}
                            phone={phone}
                            streetAddress1={streetAddress1}
                            streetAddress2={streetAddress2}
                            city={city}
                            state={state}
                            zipcode={zipcode}
                            country={country}
                        />
                    :
                        null
                }
                

                <TouchableOpacity 
                    onPress={() => this.checkIfShouldProceed() } 
                    style={DeliveryMethodScreenStyles.confirmDeliveryButton}
                >
                    <Text style={DeliveryMethodScreenStyles.confirmDeliveryText}>
                        Confirm delivery method
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    updateAddress(field, text){
        this.setState({[field]: text});
    }

    proceed(){
        const {
            selectedDeliveryMethod,
            userFullName,
            phone,
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country,
        } = this.state;

        const shippingAddress = {
            userFullName: userFullName,
            phone: phone,
            streetAddress1: streetAddress1,
            streetAddress2: streetAddress2,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country,
        }

        var order = {
            cartItems: this.cartItems,
            selectedDeliveryMethod: selectedDeliveryMethod,
            shippingAddress: shippingAddress
        }

        this.props.navigation.navigate("PaymentScreen", { order: order });
    }

    checkIfShouldProceed(){
        if(this.state.selectedDeliveryMethod == "pickup"){
            this.proceed();
        }
        else if(this.state.selectedDeliveryMethod == "shipping"){
           this.checkIfValidAddress();
        }
    }

    checkIfValidAddress(){
        const {
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country
        } = this.state;

        let request = fetch('https://api.goshippo.com/addresses/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "ShippoToken " + ShippoConfig.apiKey
            },
            body: JSON.stringify({
                street1: streetAddress1,
                street2: streetAddress2,
                city: city,
                state: state,
                zip: zipcode,
                country: country,
                validate: true
            })
        });

        request
            .then(response => {
                let jsonResponse = response.json();

                jsonResponse
                    .then(validationMetaData =>{
                        
                        if(!validationMetaData.validation_results.is_valid){
                            Alert.alert(
                                "An invalid invalid address was inputted.",
                                "",
                                [{text: 'OK'}],
                                { cancelable: false }
                            );
                        }
                        else if(!this.areAllRequiredFieldsFilled()){
                            Alert.alert(
                                "You must fill in all of the required fields.",
                                "",
                                [{text: 'OK'}],
                                { cancelable: false }
                            );
                        }
                        else{
                            this.proceed();
                        }
                    })
                    .catch(error => {
                        console.log("Error converting request to JSON.")
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log("Error making request to Shippo.");
                console.log(error);
            });
    }

    areAllRequiredFieldsFilled(){
        const {
            userFullName,
            phone,
            streetAddress1,
            city,
            zipcode,
        } = this.state;

        return (
            userFullName.trim() !== "" &&
            phone.trim() !== "" &&
            streetAddress1.trim() !== "" &&
            city.trim() !== "" &&
            zipcode.trim() !== ""
        );
    }



    renderIosPicker(){
        const {selectedDeliveryMethod, isIosDialogVisible} = this.state;
        return(
            <View>
                <TouchableOpacity 
                    onPress={() => this.toggleIosDialogBox()}
                    style={DeliveryMethodScreenStyles.picker}
                >
                    <Text style={DeliveryMethodScreenStyles.iosDeliveryMethodText}>{DeliveryMethodDisplayText[selectedDeliveryMethod]}</Text>
                </TouchableOpacity>
                <Modal 
                    onBackdropPress={() => this.toggleIosDialogBox()}
                    style={DeliveryMethodScreenStyles.popupModal} 
                    isVisible={isIosDialogVisible}
                >
                    <View style={DeliveryMethodScreenStyles.popupFlatlistContainer}>
                        <FlatList
                            data={this.getIosPickerItems()}
                            renderItem={ ({ item }) =>
                                <TouchableOpacity 
                                    onPress={ () => this.updateDeliveryMethod(item.key) }
                                    style={DeliveryMethodScreenStyles.popupEntriesBackground}
                                >
                                    <Text style={DeliveryMethodScreenStyles.popupEntriesText}>{DeliveryMethodDisplayText[item.key]}</Text>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </Modal>
            </View>
        );
    }

    toggleIosDialogBox(){ 
        const {isIosDialogVisible} = this.state;
        if(isIosDialogVisible){
            this.setState({ isIosDialogVisible: false }); 
        }
        else{
            this.setState({ isIosDialogVisible: true }); 
        }   
    }

    getIosPickerItems(){
        const items = [
            {key: "pickup"},
            {key: "shipping"}
        ];

        return items;
    }

    updateDeliveryMethod(method){
        const {isIosDialogVisible} = this.state;
        if(isIosDialogVisible){
            this.setState({ 
                selectedDeliveryMethod: method,
                isIosDialogVisible: false 
            });  
        }
        else{
            this.setState({ 
                selectedDeliveryMethod: method,
                isIosDialogVisible: true 
            }); 
        }   
    }

    renderItem(item){
        const { 
            imageDownloadUrl,
            producerName,
            confectionName,
            vendorAddress
        } = item;

        return(
            <ItemPickupLocation
                vendorAddress={vendorAddress}
                imageDownloadUrl={imageDownloadUrl}
                producerName={producerName}
                confectionName={confectionName}
            />
        );
    }
}
