import React, { Component } from 'react';
import DataEntries from './components/DataEntries';
import Barcode from '../../helpers/Barcode';

export default class AddChocolateScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Add Chocolate",
  });
  
  render() {
    const { navigation } = this.props;
    const barcode = navigation.getParam('barcode', new Barcode("None", "None"));
    return ( 
      <DataEntries 
        barcode = { barcode }
        navigate = { navigation.navigate }
      /> 
    );
  }
}