import React, { Component } from 'react';
import { 
  Dimensions,
  Image,
  Text, 
  TouchableOpacity,
  View, 
 } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Constants from '../../../helpers/Constants';
import * as firebase from 'firebase';

export default class ImageArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageDownloadUrl: this.props.imageDownloadUrl,
    }
  }

  getPicture = async() =>{
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {      
      this.uploadImage(result.uri);
    }
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
        alert(Constants.ErrorGettingImage);
      });

    blob.close();

    await ref
      .getDownloadURL()
      .then(url => {
        const input = {
          "field" : "imageDownloadUrl", 
          "value" : url
        };
        
        this.props.updateInput(input);
        this.setState({ imageDownloadUrl : url });
      })
      .catch(error => {
        console.log(error);
        alert(Constants.ErrorGettingImage);
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

  renderBlankImage(){
    return(
      <TouchableOpacity onPress={()=>{ this.getPicture(); }}>
        <View style={{width: Dimensions.get('window').width, height: 250, backgroundColor: 'grey'}}>
          <Text>{this.props.displayName}</Text> 
          <Text style={{textAlign: 'right'}}>{this.state.value}</Text>
        </View>
      </TouchableOpacity> 
    );  
  }

  renderImage(){
    return(
      <TouchableOpacity onPress={()=>{ this.getPicture(); }}>
        <Image 
          style={{width: Dimensions.get('window').width, height: 250}}
          source={{ uri: this.state.imageDownloadUrl }}
        />
      </TouchableOpacity>
    );
  }
  
  render(){
    const { imageDownloadUrl } = this.state;

    if(imageDownloadUrl == ''){
      return this.renderBlankImage();
    }
    else{
      return this.renderImage();
    }
  }
}