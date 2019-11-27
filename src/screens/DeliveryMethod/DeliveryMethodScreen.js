import React, { Component } from 'react';
import { 
    FlatList, 
    Picker,
    ScrollView, 
    Text,
    TouchableOpacity,
    View 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../helpers/Constants';
import { DeliveryMethodScreenStyles } from './styles';
import ItemLocation from './components/ItemLocation';

export default class DeliveryMethodScreen extends Component {
    constructor(props) {
        super(props);
        this.numPickerItems = 2;
        this.cartItems = this.props.navigation.getParam('cartItems', {});

        this.state = {
            selectedDeliveryMethod: "pickup"
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
                    <Picker 
                        selectedValue={selectedDeliveryMethod}
                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedDeliveryMethod: itemValue })}
                        style={DeliveryMethodScreenStyles.picker}
                    >
                        <Picker.Item label={"Pickup"} value={"pickup"} />
                        <Picker.Item label={"Shipping"} value={"shipping"} />
                    </Picker>
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

    renderItem(item){
        const { 
            imageDownloadUrl,
            producerName,
            confectionName,
            vendorAddress
        } = item.key;

        return(
            <ItemLocation
                vendorAddress={vendorAddress}
                imageDownloadUrl={imageDownloadUrl}
                producerName={producerName}
                confectionName={confectionName}
            />
        );
    }
}
