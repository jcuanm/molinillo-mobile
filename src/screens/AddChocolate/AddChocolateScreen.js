import React, { Component } from 'react';
import './components/DataEntries'
import DataEntries from './components/DataEntries';

export default class AddChocolateScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Add Chocolate",
    })
    
    render() {
        const { navigation } = this.props;
        const barcodeType = navigation.getParam('barcodeType', 'none');
        const barcodeData = navigation.getParam('barcodeData', 'none');
        return ( 
            <DataEntries 
                barcodeType = {barcodeType}
                barcodeData = {barcodeData}
                addToMyChocolates = {navigation.getParam('addToMyChocolates', null)}
            /> 
        );
    }
}