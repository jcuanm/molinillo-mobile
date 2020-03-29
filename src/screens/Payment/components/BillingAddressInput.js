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
            isCountryDialogVisible: false,
            isStateDialogVisible: false,
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
            country,
            phone
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
                        value={phone}
                        maxLength={255}
                        blurOnSubmit
                        placeholder={"Phone number"}
                        clearButtonMode={"always"}
                        style={BillingAddressInputStyles.inputBox} 
                        onChangeText={newText => this.onChangeText("phone", newText)}
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
                    <TouchableOpacity 
                        onPress={() => this.setState({isStateDialogVisible: true})}
                        style={BillingAddressInputStyles.dialogButton}
                    >
                        <Text style={BillingAddressInputStyles.dialogButtonText}>
                            {state}
                        </Text>

                        <View style={BillingAddressInputStyles.chevron}>
                            <Entypo size={20} name={"chevron-down"} />
                        </View>
                        
                        {this.renderOptionsDialog("USStates", "state")}

                    </TouchableOpacity>
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
                        style={BillingAddressInputStyles.dialogButton}
                    >
                        <Text style={BillingAddressInputStyles.dialogButtonText}>
                            {country}
                        </Text>

                        <View style={BillingAddressInputStyles.chevron}>
                            <Entypo size={20} name={"chevron-down"} />
                        </View>
                        
                        {this.renderOptionsDialog("countryOfOrigin", "country")}

                    </TouchableOpacity>   
                </View> 
                 
            </View>
		);
    }

    renderOptionsDialog(datasetName, stateAttributeToUpdate){

        if(datasetName == "USStates"){
            var dialogBox = "isStateDialogVisible";
            var isDialogVisible = this.state.isStateDialogVisible;
        }
        else if(datasetName == "countryOfOrigin"){
            var dialogBox = "isCountryDialogVisible";
            var isDialogVisible = this.state.isCountryDialogVisible;
        }
        else{
            var dialogBox = "";
            var isDialogVisible = false;
        }

        return(
            <Modal 
                onBackdropPress={() => this.setState({[dialogBox]: false})}
                style={BillingAddressInputStyles.popupModal} 
                isVisible={isDialogVisible}
            >
                <View style={BillingAddressInputStyles.popupFlatlistContainer}>
                    <FlatList
                        data={dialogOptionsDatasets[datasetName]}
                        renderItem={ ({ item }) =>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.props.updatePaymentInfo([stateAttributeToUpdate], item.key);

                                    this.setState({
                                        [dialogBox]: false
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
