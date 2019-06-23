import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { StringConcatenations } from '../../../helpers/Constants';
import Entry from './Entry';
import ImageArea from './ImageArea';
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
    this.requiredInputFields = ["imageDownloadUrl", "confectionName"];
  }

  updateInput(input){
    this.inputValues[input['field']] = input['value'];
  }
  
  submitInput(inputValues){
    const { barcode, navigate } = this.props;

    if(!this.isValidInput(inputValues)){
      alert("There are required fields that are missing");
      return;
    }

    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
    let myChocolatesRef = this.dbHandler.getRef('MyChocolates');

    barcodeTypeRef.set(inputValues);
    myChocolatesRef.set( { [barcode.data] : barcode.type }, { merge : true });
    
    navigate(
      "DetailScreen", 
      { results : inputValues, shouldUserEditItem : true }
    );
  }

  isValidInput(inputValues){
    for(let i = 0; i < this.requiredInputFields.length; i++){
      let requiredField = this.requiredInputFields[i];
      if(!(requiredField in inputValues)){
        return false;
      }
    }

    return true;
  }
  
  render(){
    return(
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <ImageArea 
            id={"image"} 
            displayName={"Image"}
            barcode={this.props.barcode}
            updateInput={this.updateInput}
          />
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