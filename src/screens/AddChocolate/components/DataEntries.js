const uuidv4 = require('uuid/v4');
import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { StringConcatenations, Warnings } from '../../../helpers/Constants';
import CallbacksAndParams from '../../../helpers/CallbacksAndParams';
import Entry from './Entry';
import ImageArea from './ImageArea';
import DbHandler from '../../../helpers/DbHandler';
import styles from '../../../styles';
import * as firebase from 'firebase';

export default class DataEntries extends Component {
  constructor(props){
    super(props);
    this.updateInput = this.updateInput.bind(this); 
    this.submitInput = this.submitInput.bind(this); 
    this.denySubmission = this.denySubmission.bind(this); 
    this.dbHandler = new DbHandler();
    this.inputValues = {
      numFlags : 0,
      numLikes : 0,
      barcodeType : this.props.barcode.type,
      barcodeData : this.props.barcode.data,
      uuid : uuidv4(),
    };
    this.requiredInputFields = ["imageDownloadUrl", "confectionName"];
  }

  updateInput(input){
    this.inputValues[input['field']] = input['value'];
  }
  
  checkIfShouldSubmit(inputValues){
    if(!this.isValidInput(inputValues)){
      alert("There are required fields that are missing");
      return;
    }

    const { barcode } = this.props;
    
    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
    const params = {
      barcodeTypeRef : barcodeTypeRef,
      inputValues : inputValues,
    }

    let checkSubmitCallbacksAndParams = new CallbacksAndParams(
      params,
      this.denySubmission,
      this.submitInput
    );

    this.dbHandler.getData(barcodeTypeRef, checkSubmitCallbacksAndParams);
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

  async submitInput(callbacksAndParams){
    const { barcode, navigate } = this.props;
    let barcodeTypeRef = callbacksAndParams.params.barcodeTypeRef;
    let inputValues = callbacksAndParams.params.inputValues;

    await this.uploadImage(inputValues["imageDownloadUrl"]);

    let myChocolatesRef = this.dbHandler.getRef('MyChocolates');

    barcodeTypeRef.set(inputValues);
    myChocolatesRef.set( { [barcode.data] : barcode.type }, { merge : true });
    
    navigate(
      "DetailScreen", 
      { results : inputValues, shouldUserEditItem : true }
    );
  }

  denySubmission(callbacksAndParams){
    alert("Sorry, someone beat you to this chocolate!");
    this.props.navigate("SearchScreen");
  }

  // This function was copied from the following link:
  // https://github.com/expo/expo/issues/2402
  async uploadImage(uri){
    const blob = await this.getBlob(uri);
    const { barcode } = this.props;
    let filename = barcode.type + "/" + barcode.data;
    let ref = firebase
      .storage()
      .ref()
      .child(filename);

    await ref
      .put(blob)
      .then(() => {})
      .catch(error => {
        console.log(error);
        alert(Warnings.ErrorGettingImage);
      });

    blob.close();

    await ref
      .getDownloadURL()
      .then(url => {
        const input = {
          "field" : "imageDownloadUrl", 
          "value" : url
        };
        
        this.updateInput(input);
        this.setState({ imageDownloadUrl : url });
      })
      .catch(error => {
        console.log(error);
        alert(Warnings.ErrorGettingImage);
      });
  }

  async getBlob(uri){
    return(
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      })
    );
  }
  
  render(){
    return(
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <ImageArea 
            id={"image"} 
            displayName={"Add Image"}
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
          onPress={() => this.checkIfShouldSubmit(this.inputValues)}
          styles={styles.button}
        />
      </View>
    );
  }
}