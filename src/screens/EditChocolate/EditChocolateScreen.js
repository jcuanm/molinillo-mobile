import React, { Component } from 'react';
import './components/DataEntries'
import DataEntries from './components/DataEntries';
import Barcode from "../../helpers/Barcode";

export default class EditChocolateScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Edit Chocolate",
    });
    
    render() {
        const { navigation } = this.props;
        let error_barcode = new Barcode("None", "None");
        const barcode = navigation.getParam('barcode', error_barcode);
        const entries = navigation.getParam('entries', {});
        
        return ( 
            <DataEntries 
                entries={entries}
                barcode={barcode}
                popToTop={navigation.popToTop}
            /> 
        );
    }
}