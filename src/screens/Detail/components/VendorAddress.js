import React, { Component } from 'react';
import { 
    Dimensions,
    Text,
    View
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../../../helpers/Constants';

export default class VendorAddress extends Component {
	render() {
        const { address } = this.props;

		return (
            <View style={{
                flexDirection: "row",
                borderBottomColor: Colors.Primary, 
                borderBottomWidth: .5,
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    height: 100,
                    backgroundColor:"white",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Entypo 
                        size={40}
                        name={"shop"}
                    />
                    
                    <Text style={{textAlign:"center", fontSize:14, paddingLeft: 10, paddingRight: 10}}> Vendor Address </Text>
                </View>

                <View style={{
                    width: Dimensions.get('window').width / 2,
                    height: 100,
                    backgroundColor:"white",
                    justifyContent: 'center',
                    alignItems: "center"
                }}>	
                    <Text style={{fontSize:14, textAlign:"center"}}>{address ? address : "Unknown" }</Text>
                </View>
            </View>
		);
    }
}