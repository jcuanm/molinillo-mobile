import React, { Component } from 'react';
import { 
    View
} from 'react-native';
import Option from './Option';

export default class ProfileOptions extends Component {
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Option 
                    title={"My Chocolates"} 
                    navigateScreen={"MyChocolatesScreen"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <Option 
                    title={"Ratings"} 
                    navigateScreen={"RatingsScreen"} 
                    navigationFunc={this.props.navigationFunc} 
                />
                <Option 
                    title={"Wishlist"} 
                    navigateScreen={"WishlistScreen"} 
                    navigationFunc={this.props.navigationFunc} 
                />
            </View>
        );
    }
}