import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { VendorAddressStyles } from '../styles';

export default class VendorAddress extends Component {
	render() {
        const { address } = this.props;

		return (
            <View style={VendorAddressStyles.container}>
                <View style={VendorAddressStyles.addressIcon}>
                    <Entypo 
                        size={40}
                        name={"shop"}
                    />
                    
                    <Text style={VendorAddressStyles.addressTitle}> Vendor Address </Text>
                </View>

                <View style={VendorAddressStyles.addressTextBlock}>	
                    <Text style={VendorAddressStyles.addressText}>{address ? address : "Unknown" }</Text>
                </View>
            </View>
		);
    }
}
