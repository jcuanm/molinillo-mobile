import React, { Component } from 'react';
import { View } from 'react-native';
import Feedback from './Feedback';
import MyChocolates from './MyChocolates';
import About from './About';
import PrivacyPolicy from './PrivacyPolicy';
import Contact from './Contact';
import { ProfileOptionsStyles } from '../styles';

export default class ProfileOptions extends Component {
    render(){
        return(
            <View style={ProfileOptionsStyles.container}>
                <Feedback 
                    title={"Send Feedback"} 
                />
                <MyChocolates 
                    title={"My Chocolates"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <About
                    title={"Our Story"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <Contact 
                    title={"Contact Us"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <PrivacyPolicy
                    title={"Privacy Policy"} 
                />
            </View>
        );
    }
}