import React, { Component } from 'react';
import { 
  Image,
  Text, 
  TouchableOpacity,
  View, 
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageAreaStyles } from '../styles';

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

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [6, 5],
    });

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
        <View style={ImageAreaStyles.blankImageContainer}>
          <Text style={ImageAreaStyles.text}>
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
          style={ImageAreaStyles.image}
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