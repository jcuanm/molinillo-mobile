import React, { Component } from 'react';
import { View } from 'react-native';
import Feedback from './Feedback';
import About from './About';
import Policy from './Policy';
import Contact from './Contact';
import OrderHistory from './OrderHistory';
import { PrivacyPolicyUrl, TermsAndServicesUrl } from '../../../../../helpers/Constants';
import { ProfileOptionsStyles } from '../styles';

export default class ProfileOptions extends Component {
    render(){
        return(
            <View style={ProfileOptionsStyles.container}>
                <OrderHistory
                    title={"Order History"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <Feedback 
                    title={"Send Feedback"} 
                />
                <About
                    title={"Our Story"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <Contact 
                    title={"Contact Us"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <Policy
                    title={"Privacy Policy"} 
                    url={PrivacyPolicyUrl}
                />
                <Policy
                    title={"Terms of Service"} 
                    url={TermsAndServicesUrl}
                />
            </View>
        );
    }
}