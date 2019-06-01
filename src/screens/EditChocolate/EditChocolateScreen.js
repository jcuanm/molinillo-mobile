import React, { Component } from 'react';
import './components/DataEntries'
import DataEntries from './components/DataEntries';

export default class EditChocolateScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Edit Chocolate",
    });
    
    render() {
        const { navigation } = this.props;
        const barcode = navigation.getParam('barcode', 'none');
        const entries = navigation.getParam('entries', 'none');
        return ( 
            <DataEntries 
                entries={entries}
                barcode={barcode}
                popToTop={navigation.popToTop}
            /> 
        );
    }
}