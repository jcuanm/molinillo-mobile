const uuidv4 = require('uuid/v4');
import React, { Component } from 'react';
import { 
  Alert,
  View, 
  Button, 
  ScrollView
} from 'react-native';
import { StringConcatenations, Warnings } from '../../../helpers/Constants';
import CallbacksAndParams from '../../../helpers/CallbacksAndParams';
import Entry from './Entry';
import ImageArea from './ImageArea';
import DbHandler from '../../../helpers/DbHandler';
import { Colors } from '../../../helpers/Constants';
import { DataEntriesStyles } from '../styles';
import * as firebase from 'firebase';

export default class DataEntries extends Component {
  constructor(props){
    super(props);
    this.updateInput = this.updateInput.bind(this); 
    this.submitInput = this.submitInput.bind(this); 
    this.denySubmission = this.denySubmission.bind(this); 
    this.dbHandler = new DbHandler();
    this.inputValues = {
      barcodeType : this.props.barcode.type,
      barcodeData : this.props.barcode.data,
      uuid : uuidv4(),
    };
    this.requiredInputFields = ["imageDownloadUrl", "confectionName", "producerName"];
  }

  updateInput(input){
    this.inputValues[input['field']] = input['value'];
  }
  
  // Checks that all required fields are filled in and that the chocolate wasn't added before user hit submit
  checkIfShouldSubmit(inputValues){
    if(!this.isValidInput(inputValues)){
      alert("There are required fields that are missing");
      return;
    }

    const { barcode } = this.props;
    
    let barcodeTypeRef = this.dbHandler.getRef("Possible" + StringConcatenations.Prefix, barcode);
    const params = {
      possibleBarcodeTypeRef : barcodeTypeRef,
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
    const { navigate } = this.props;
    let possibleBarcodeTypeRef = callbacksAndParams.params.possibleBarcodeTypeRef;
    let inputValues = callbacksAndParams.params.inputValues;

    await this.uploadImage(inputValues["imageDownloadUrl"]);

    possibleBarcodeTypeRef.set(inputValues);
    
    navigate("SearchScreen");

    Alert.alert(
      "Thanks for adding your chocolate!",
      "Our dedicated experts will now curate your post before publicly displaying it.",
      [
        {text: 'OK'}
      ],
      { cancelable: false }
    );
  }

  denySubmission(callbacksAndParams){
    alert("We are already curating this confection.");
    this.props.navigate("SearchScreen");
  }

  // This function was copied from the following link:
  // https://github.com/expo/expo/issues/2402
  async uploadImage(uri){
    const blob = await this.getBlob(uri);
    const { barcode } = this.props;
    let filename = "Possible_" + barcode.type + "/" + barcode.data;
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
      <View style={DataEntriesStyles.container}>
        <ScrollView 
          style={DataEntriesStyles.scrollView} 
          keyboardShouldPersistTaps={'handled'}
        >
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
            dialogType={"typing"}
          />
          <Entry 
            id={"producerName"}
            displayName={"Producer Name"} 
            updateInput={this.updateInput} 
            dialogType={"typing"}        
          />
          <Entry 
            id={"confectionDescription"}
            displayName={"Confection Description"} 
            updateInput={this.updateInput} 
            dialogType={"typing"}        
          />
          <Entry 
            id={"vendorUrl"}
            displayName={"Vendor Website"} 
            updateInput={this.updateInput}
            dialogType={"typing"} 
          />
          <Entry 
            id={"vendorAddress"}
            displayName={"Vendor Address"} 
            updateInput={this.updateInput}
            dialogType={"typing"} 
          />
          <Entry 
            id={"cacaoVariety"} 
            displayName={"Cacao Variety"}
            updateInput={this.updateInput} 
            dialogType={"options"} 
          />
          <Entry 
            id={"cacaoPercentage"}
            displayName={"Cacao Percentage"} 
            updateInput={this.updateInput}
            dialogType={"typing"} 
          />
          <Entry 
            id={"countryOfOrigin"}
            displayName={"Country of Origin"} 
            updateInput={this.updateInput} 
            dialogType={"options"} 
          />
        </ScrollView>

        <View style={DataEntriesStyles.submitButton}>
          <Button
            title="Submit"
            onPress={() => this.checkIfShouldSubmit(this.inputValues)}
            color={Colors.Primary}
          />
        </View>
      </View>
    );
  }
}
