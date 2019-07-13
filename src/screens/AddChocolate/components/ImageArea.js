import React, { Component } from 'react';
import { 
  Dimensions,
  Image,
  Text, 
  TouchableOpacity,
  View, 
 } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, height: 150, backgroundColor: 'rgb(255,255,240)'}}>
          <Text style={{ fontSize: 25 }}>
            <Ionicons size={25} name="md-add" color="grey"/>
            {" " + this.props.displayName}
          </Text> 
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