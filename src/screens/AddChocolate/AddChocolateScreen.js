import React, { Component } from 'react';
import DataEntries from './components/DataEntries';
import Barcode from '../../helpers/Barcode';

export default class AddChocolateScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Add Chocolate",
  });
  
  render() {
    const { navigation } = this.props;
    let error_barcode = new Barcode("None", "None");
    const barcode = navigation.getParam('barcode', error_barcode);
    return ( 
      <DataEntries 
        barcode = { barcode }
        navigate = { navigation.navigate }
      /> 
    );
  }
}