import React, { Component } from 'react';
import { 
  Image,
  Text, 
  TouchableOpacity,
  View, 
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageAreaStyles } from '../styles';

export default class ImageArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageDownloadUrl: '',
    }
  }

  getPicture = async(imageCaptureMethod) =>{
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const params = {
      allowsEditing: true,
      aspect: [6, 5],
    }

    if(imageCaptureMethod == "image_library"){
      var result = await ImagePicker.launchImageLibraryAsync(params);
    }
    else if(imageCaptureMethod == "camera"){
      var result = await ImagePicker.launchCameraAsync(params);
    }
    else{ 
      return; 
    }

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
      <View>
        <View style={ImageAreaStyles.blankImageContainer}>
          <TouchableOpacity 
            onPress={()=>{ this.getPicture("image_library"); }} 
            style={ImageAreaStyles.uploadIconContainer}
          >
            <Entypo size={45} name={"upload"} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={()=>{ this.getPicture("camera"); }} 
            style={ImageAreaStyles.uploadIconContainer}
          >
            <Ionicons size={45} name="md-camera" color="black"/>
          </TouchableOpacity>
        </View>
      </View> 
    );  
  }

  renderImage(){
    return(
      <View>
        <Image 
          style={ImageAreaStyles.image}
          source={{ uri: this.state.imageDownloadUrl }}
        />

        <TouchableOpacity 
          onPress={()=>{ this.setState({imageDownloadUrl: ''}); }} 
          style={ImageAreaStyles.redoParentContainer}
        >
          <View style={ImageAreaStyles.redoIconContainer} >
            <Ionicons size={20} name="md-refresh" color="black"/>
          </View>
          <Text style={ImageAreaStyles.retakeText}>Retake</Text>
        </TouchableOpacity>
      </View>
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
