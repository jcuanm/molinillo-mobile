import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { dialogOptionsDatasets } from '../../../helpers/Constants';
import { BillingAddressInputStyles } from '../styles';
import CheckBox from 'react-native-check-box';
import { Colors } from '../../../helpers/Constants';

export default class BillingAddressInput extends Component {
    constructor(props) {
        super(props);
        this.maxStringLength = 255;

		this.state = {
            isCountryDialogVisible: false
		};
    }

    onChangeText(field, newText){
        if(newText.length > this.maxStringLength){
            Alert.alert(
                "Can't exceed 255 characters",
                "",
                [
                  {text: 'OK'}
                ],
                { cancelable: false }
            );
            return;
        }
        else{
            this.props.updatePaymentInfo(field, newText);
        }
    }

	render() {
        const {
            updateToShippingAddress,
            useShippingAddress,
            shippingAddress,
            selectedDeliveryMethod,
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country
        } = this.props;

		return (
            <View>
                <Text style={BillingAddressInputStyles.title}>Billing address</Text>

                {
                    selectedDeliveryMethod == "shipping" ?
                        <CheckBox
                            style={BillingAddressInputStyles.checkbox}
                            checkBoxColor={Colors.Primary}
                            onClick={()=>{
                                updateToShippingAddress(useShippingAddress, shippingAddress);
                            }}
                            isChecked={useShippingAddress}
                            rightText={"Same as shipping address"}
                        />
                    :
                            null
                }
                
                <View>
                    <TextInput 
                        value={streetAddress1}
                        maxLength={255}
                        blurOnSubmit
                        placeholder={"Street address or P.O. Box"}
                        clearButtonMode={"always"}
                        style={BillingAddressInputStyles.inputBox} 
                        onChangeText={newText => this.onChangeText("streetAddress1", newText)}
                    />
                    <TextInput 
                        value={streetAddress2}
                        maxLength={255}
                        blurOnSubmit
                        placeholder={"Apt, Suite, Unit, Building (optional)"}
                        clearButtonMode={"always"}
                        style={BillingAddressInputStyles.inputBox} 
                        onChangeText={newText => this.onChangeText("streetAddress2", newText)}
                    />
                    <TextInput 
                        value={city}
                        maxLength={255}
                        blurOnSubmit
                        placeholder={"City"}
                        clearButtonMode={"always"}
                        style={BillingAddressInputStyles.inputBox} 
                        onChangeText={newText => this.onChangeText("city", newText)}
                    />
                    <TextInput 
                        value={state}
                        maxLength={255}
                        blurOnSubmit
                        placeholder={"State/Province/Region"}
                        clearButtonMode={"always"}
                        style={BillingAddressInputStyles.inputBox} 
                        onChangeText={newText => this.onChangeText("state", newText)}
                    />
                    <TextInput 
                        value={zipcode}
                        maxLength={255}
                        blurOnSubmit
                        placeholder={"ZIP"}
                        clearButtonMode={"always"}
                        style={BillingAddressInputStyles.inputBox} 
                        onChangeText={newText => this.onChangeText("zipcode", newText)}
                    />
                    <TouchableOpacity 
                        onPress={() => this.setState({isCountryDialogVisible: true})}
                        style={BillingAddressInputStyles.countryButton}
                    >
                        <Text style={BillingAddressInputStyles.countryButtonText}>
                            {country}
                        </Text>

                        <View style={BillingAddressInputStyles.chevron}>
                            <Entypo size={20} name={"chevron-down"} />
                        </View>
                        
                        {this.renderOptionsDialog()}

                    </TouchableOpacity> 
                </View> 
                 
            </View>
		);
    }

    renderOptionsDialog(){
        const { isCountryDialogVisible } = this.state;

        return(
            <Modal 
                onBackdropPress={() => this.setState({isCountryDialogVisible: false})}
                style={BillingAddressInputStyles.popupModal} 
                isVisible={isCountryDialogVisible}
            >
                <View style={BillingAddressInputStyles.popupFlatlistContainer}>
                    <FlatList
                        data={dialogOptionsDatasets["countryOfOrigin"]}
                        renderItem={ ({ item }) =>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.props.updatePaymentInfo("country", item.key);
                                    this.setState({
                                        isCountryDialogVisible: false
                                    })
                                }} 
                                style={BillingAddressInputStyles.popupEntriesBackground}
                            >
                                <Text style={BillingAddressInputStyles.popupEntriesText}>
                                    {item.key}
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </Modal>
        );
    }
}