import React, { Component } from 'react';
import { 
  Dimensions,
  Image,
  Text, 
  TouchableOpacity,
  View, 
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
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
        <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, height: 150, backgroundColor: 'rgba(0,0,0,.3)'}}>
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