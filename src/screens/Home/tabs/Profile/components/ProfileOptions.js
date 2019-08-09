import React, { Component } from 'react';
import { View } from 'react-native';
import Feedback from './Feedback';
import MyChocolates from './MyChocolates';
import About from './About';


export default class ProfileOptions extends Component {
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Feedback 
                    title={"Send feedback"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <MyChocolates 
                    title={"My chocolates"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <About
                    title={"Our story"} 
                    navigationFunc={this.props.navigationFunc} 
                />
            </View>
        );
    }
}