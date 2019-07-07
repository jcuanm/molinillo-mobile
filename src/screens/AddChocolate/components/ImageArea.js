import React, { Component } from 'react';
import { 
  Dimensions,
  Image,
  Text, 
  TouchableOpacity,
  View, 
 } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class ImageArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageDownloadUrl: '',
    }
  }

  getPicture = async() =>{
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) { 
      const input = {
        "field" : "imageDownloadUrl", 
        "value" : result.uri,
      };

      this.props.updateInput(input);
      this.setState({ imageDownloadUrl : result.uri });
    }
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