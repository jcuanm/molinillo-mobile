import React, { Component } from 'react';
import { 
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
import { Colors } from '../../helpers/Constants';
import { DeliveryMethodScreenStyles } from './styles';
import ItemPickupLocation from './components/ItemPickupLocation';
import ShippingAddressInput from './components/ShippingAddressInput';

export default class DeliveryMethodScreen extends Component {
    constructor(props) {
        super(props);
        this.numPickerItems = 2;
        this.cartItems = this.props.navigation.getParam('cartItems', {});
        this.displayText = {
            "pickup": "Pickup",
            "shipping": "Shipping"
        }

        this.state = {
            selectedDeliveryMethod: "pickup",
            isIosDialogVisible: false
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
        const { selectedDeliveryMethod } = this.state;

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
                            renderItem={({_, index}) => this.renderItem(this.cartItems[index].key)}
                            keyExtractor={(_, index) => index.toString()}
                        /> 
                    :
                        null
                }

                {
                    selectedDeliveryMethod == "shipping" ?
                        <ShippingAddressInput />
                    :
                        null
                }
                

                <TouchableOpacity 
                    onPress={() => console.log("Continue to payment method")} // this.props.navigation.navigate("DeliveryMethodScreen", { cartItems: cartItems }) }
                    style={DeliveryMethodScreenStyles.proceedToCheckoutButton}
                >
                    <Text style={DeliveryMethodScreenStyles.proceedToCheckoutText}>
                        Confirm delivery method
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
                    <Text style={DeliveryMethodScreenStyles.iosDeliveryMethodText}>{this.displayText[selectedDeliveryMethod]}</Text>
                </TouchableOpacity>
                <Modal 
                    onBackdropPress={() => this.toggleIosDialogBox()}
                    style={DeliveryMethodScreenStyles.popupModal} 
                    isVisible={isIosDialogVisible}
                >
                    <View style={DeliveryMethodScreenStyles.popupFlatlistContainer}>
                        <FlatList
                            data={this.getIosPickerItems()}
                            renderItem={
                            ({ item }) =>
                                <TouchableOpacity 
                                    onPress={ () => this.updateDeliveryMethod(item.key) }
                                    style={DeliveryMethodScreenStyles.popupEntriesBackground}
                                >
                                    <Text style={DeliveryMethodScreenStyles.popupEntriesText}>{this.displayText[item.key]}</Text>
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
        } = item.key;

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
