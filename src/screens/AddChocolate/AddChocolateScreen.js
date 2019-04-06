import React, { Component } from 'react';
import './components/DataEntries'
import DataEntries from './components/DataEntries';

export default class AddChocolateScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Add Chocolate",
    })
    
    render() {
        const { navigation } = this.props;
        const barcode = navigation.getParam('barcode', 'none');
        return ( 
            <DataEntries 
                barcode = { barcode }
                navigate = { navigation.navigate }
            /> 
        );
    }
}