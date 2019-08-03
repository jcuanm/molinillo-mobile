import React, { Component } from 'react';
import { 
    Dimensions,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../helpers/Constants';

export default class VendorWebsite extends Component {
	render() {
        const { openWebpage, url } = this.props;

		return (
            <View style={{
                flexDirection: "row"
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    height: 100,
                    backgroundColor:"white",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Ionicons
                        size={40}
                        name={"md-link"}
                    />
                    
                    <Text style={{textAlign:"center", fontSize:14, paddingLeft: 10, paddingRight: 10}}> Vendor Website </Text>
                </View>

                <View style={{
                    width: Dimensions.get('window').width / 2,
                    height: 100,
                    backgroundColor:"white",
                    justifyContent: 'center',
                    alignItems: "center"
                }}>	
                    <TouchableOpacity onPress={() => openWebpage(url)}>
                        <Text style={{fontSize:14, textAlign:"center", color: Colors.Primary, fontWeight:"bold"}}>Link</Text>
                    </TouchableOpacity>
                </View>
            </View>
		);
	}
}