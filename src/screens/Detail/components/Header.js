import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Header extends Component {
	render() {
        const {
            producerName,
            confectionName,
            numStarRatings,
            sumRatings
        } = this.props;
		return (
			<View style={{
                flexDirection: "row",
                height: 100,
                backgroundColor:"white"
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent:"center",
                }}>
                    <Text style={{paddingLeft: 25, fontSize:18, fontWeight:'bold'}}> {producerName} </Text>
                    <Text style={{paddingLeft: 25, fontSize:18}}> {confectionName} </Text>
                </View>

                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'center',
                }}>	
                    <Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
                        <Ionicons name="md-star" size={30} color="gold" />   
                        {(sumRatings / numStarRatings) ? (sumRatings / numStarRatings).toFixed(1) : " "}
                    </Text>

                    <Text style={{fontSize:12, textAlign:"center", color:'rgba(0, 0, 0, .4)'}}>
                        {numStarRatings} <Text style={{fontStyle:"italic", }}>ratings</Text>
                    </Text>
                </View>
            </View>
		);
	}
}