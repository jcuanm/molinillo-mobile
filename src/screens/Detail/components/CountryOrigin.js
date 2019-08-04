import React, { Component } from 'react';
import { 
    Dimensions,
    Text,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flag from 'react-native-flags';
import { Colors, CountryCodeMappings } from '../../../helpers/Constants';

export default class CountryOrigin extends Component {
	render() {
        const { country } = this.props;

		return (
            <View style={{
                flexDirection: "row",
                borderBottomColor: Colors.Primary, 
                borderBottomWidth: .5,
                height: 100,
                backgroundColor:"white",
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Ionicons
                        size={32}
                        name={"md-globe"}
                    />
                    
                    <Text style={{textAlign:"center", fontSize:14, paddingLeft: 10, paddingRight: 10}}> Origin </Text>
                </View>

                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'center',
                    alignItems: "center"
                }}>	
                    { country ? this.renderCountryOfOriginFound(country) : this.renderCountryOfOriginNotFound() }

                    <Text style={{textAlign:"center", fontSize: 14 }}> 
                        {country}
                    </Text>
                </View>
            </View>
		);
    }
    
    renderCountryOfOriginFound(country){
        return(
            <Flag
                type="shiny"
                size={32}
                code={CountryCodeMappings[country]}
            />
        );
    }

    renderCountryOfOriginNotFound(){
        return(
            <Text style={{textAlign:"center", fontSize: 14}}> 
                Unknown
            </Text>
        );
    }
}