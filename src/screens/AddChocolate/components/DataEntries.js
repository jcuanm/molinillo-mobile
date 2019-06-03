import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { StringConcatenations } from '../../../helpers/Constants';
import Entry from './Entry';
import DbHandler from '../../../helpers/DbHandler'
import styles from '../../../styles';

export default class DataEntries extends Component {
  constructor(props){
    super(props);
    this.updateInput = this.updateInput.bind(this); 
    this.dbHandler = new DbHandler();
    this.inputValues = {
      barcodeType : this.props.barcode.type,
      barcodeData : this.props.barcode.data
    };
  }

  updateInput(input){
    this.inputValues[input['field']] = input['value'];
  }
  
  submitInput(inputValues){
    const { barcode, navigate } = this.props;

    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
    let myChocolatesRef = this.dbHandler.getRef('MyChocolates');

    barcodeTypeRef.set(inputValues);
    myChocolatesRef.set( { [barcode.data] : barcode.type }, { merge : true });
    
    navigate("DetailScreen", { results : inputValues });
  }
  
  render(){
    return(
      <View style={styles.container}>
        <Entry 
          id={"Image"} 
          displayName={"Image"}
          updateInput={this.updateInput}
        />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Entry 
            id={"confectionName"} 
            displayName={"Confection Name"}
            updateInput={this.updateInput}
          />
          <Entry 
            id={"brand"}
            displayName={"Brand"} 
            updateInput={this.updateInput} 
          />
          <Entry 
            id={"type"}
            displayName={"Type"} 
            updateInput={this.updateInput} 
          />
          <Entry 
            id={"cacaoVariety"} 
            displayName={"Cacao Variety"}
            updateInput={this.updateInput} 
          />
          <Entry 
            id={"countryOfOrigin"}
            displayName={"Country of Origin"} 
            updateInput={this.updateInput} 
          />
        </View>
        <Button
          title="Submit"
          onPress={() => this.submitInput(this.inputValues)}
          styles={styles.button}
        />
      </View>
    );
  }
}