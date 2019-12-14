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
import { ShippingAddressInputStyles } from '../styles';

export default class ShippingAddressInput extends Component {
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
            this.props.updateAddress(field, newText);
        }
    }

	render() {
        const {
            userFullName,
            streetAddress1,
            streetAddress2,
            city,
            state,
            zipcode,
            country
        } = this.props;

		return (
            <View>
                <TextInput 
                    value={userFullName}
                    blurOnSubmit
                    maxLength={255}
                    placeholder={"Receiver full name"}
                    clearButtonMode={"always"}
                    style={ShippingAddressInputStyles.inputBox} 
                    onChangeText={newText => this.onChangeText("userFullName", newText)}
                />
               <TextInput 
                    value={streetAddress1}
                    maxLength={255}
                    blurOnSubmit
                    placeholder={"Street address or P.O. Box"}
                    clearButtonMode={"always"}
                    style={ShippingAddressInputStyles.inputBox} 
                    onChangeText={newText => this.onChangeText("streetAddress1", newText)}
                />
                <TextInput 
                    maxLength={255}
                    value={streetAddress2}
                    blurOnSubmit
                    placeholder={"Apt, Suite, Unit, Building (optional)"}
                    clearButtonMode={"always"}
                    style={ShippingAddressInputStyles.inputBox} 
                    onChangeText={newText => this.onChangeText("streetAddress2", newText)}
                />
                <TextInput 
                    maxLength={255}
                    value={city}
                    blurOnSubmit
                    placeholder={"City"}
                    clearButtonMode={"always"}
                    style={ShippingAddressInputStyles.inputBox} 
                    onChangeText={newText => this.onChangeText("city", newText)}
                />
                <TextInput 
                    maxLength={255}
                    value={state}
                    blurOnSubmit
                    placeholder={"State/Province/Region"}
                    clearButtonMode={"always"}
                    style={ShippingAddressInputStyles.inputBox} 
                    onChangeText={newText => this.onChangeText("state", newText)}
                />
                <TextInput 
                    maxLength={255}
                    value={zipcode}
                    blurOnSubmit
                    placeholder={"ZIP"}
                    clearButtonMode={"always"}
                    style={ShippingAddressInputStyles.inputBox} 
                    onChangeText={newText => this.onChangeText("zipcode", newText)}
                />
                <TouchableOpacity 
                    onPress={() => this.setState({isCountryDialogVisible: true})}
                    style={ShippingAddressInputStyles.countryButton}
                >
                    <Text style={ShippingAddressInputStyles.countryButtonText}>
                        {country}
                    </Text>

                    <View style={ShippingAddressInputStyles.chevron}>
                        <Entypo size={20} name={"chevron-down"} />
                    </View>
                    
                    {this.renderOptionsDialog()}

                </TouchableOpacity>   
            </View>
		);
    }

    renderOptionsDialog(){
        const { isCountryDialogVisible } = this.state;

        return(
            <Modal 
                onBackdropPress={() => this.setState({isCountryDialogVisible: false})}
                style={ShippingAddressInputStyles.popupModal} 
                isVisible={isCountryDialogVisible}
            >
                <View style={ShippingAddressInputStyles.popupFlatlistContainer}>
                    <FlatList
                        data={dialogOptionsDatasets["countryOfOrigin"]}
                        renderItem={ ({ item }) =>
                            <TouchableOpacity 
                                onPress={ () => {
                                    this.props.updateAddress("country", item.key);
                                    this.setState({
                                        isCountryDialogVisible: false
                                    })
                                }} 
                                style={ShippingAddressInputStyles.popupEntriesBackground}
                            >
                                <Text style={ShippingAddressInputStyles.popupEntriesText}>
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
