import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Dimensions,
 } from 'react-native';
 import DialogInput from 'react-native-dialog-input';
 
export default class Entry extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      isDialogVisible: false,
    }
  }

  sendInput(inputText){
    let currentInput = {
      'field' : this.props.id,
      'value' : inputText
    }

    this.props.updateInput(currentInput);
    this.setState({value: inputText});
  }

  showDialog(isShow){ 
    this.setState({isDialogVisible: isShow}); 
  }

  render(){
    return(
      <TouchableOpacity style={{borderBottomWidth: 0.5, borderBottomColor: "grey"}} onPress={()=>{this.showDialog(true)}}>
        <View style={{justifyContent: 'center', width: Dimensions.get('window').width, height: 50, backgroundColor: 'white' }}>
          <Text style={{textAlign: 'left', paddingLeft: 10}}>{this.props.displayName}</Text> 
          <Text style={{textAlign: 'right', paddingRight: 10}}>{this.state.value}</Text>
        </View>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={this.props.displayName}
          submitInput={ inputText => {
            this.sendInput(inputText); 
            this.showDialog(false); 
          }}
          closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>
      </TouchableOpacity>   
    );
  }
}