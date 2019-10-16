import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flag from 'react-native-flags';
import { CountryCodeMappings } from '../../../helpers/Constants';
import { CountryOriginStyles } from '../styles';

export default class CountryOrigin extends Component {
	render() {
        const { country } = this.props;

		return (
            <View style={CountryOriginStyles.container}>
                <View style={CountryOriginStyles.iconBlock}>
                    <Ionicons
                        size={32}
                        name={"md-globe"}
                    />
                    <Text style={CountryOriginStyles.iconText}> Origin </Text>
                </View>

                <View style={CountryOriginStyles.countryFlag}>	
                    { country ? this.renderCountryOfOriginFound(country) : this.renderCountryOfOriginNotFound() }

                    <Text style={CountryOriginStyles.countryName}> 
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
            <Text style={CountryOriginStyles.countryName}> 
                Unknown
            </Text>
        );
    }
}