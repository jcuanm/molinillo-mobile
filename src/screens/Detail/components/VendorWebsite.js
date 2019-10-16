import React, { Component } from 'react';
import { 
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VendorWebsiteStyles } from '../styles';

export default class VendorWebsite extends Component {
	render() {
        const { openWebpage, url } = this.props;

		return (
            <View style={VendorWebsiteStyles.container}>
                <View style={VendorWebsiteStyles.iconBlock}>
                    <Ionicons
                        size={40}
                        name={"md-link"}
                    />
                    
                    <Text style={VendorWebsiteStyles.iconText}> Vendor Website </Text>
                </View>

                <View style={VendorWebsiteStyles.linkBlock}>	
                    <TouchableOpacity onPress={() => openWebpage(url)}>
                        <Text style={VendorWebsiteStyles.linkText}>Link</Text>
                    </TouchableOpacity>
                </View>
            </View>
		);
	}
}
