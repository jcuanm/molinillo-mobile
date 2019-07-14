import React, { Component } from 'react';
import { 
  FlatList,
  View, 
  Text, 
  TouchableOpacity,
  Dimensions,
 } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Modal from 'react-native-modal';

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

  toggleDialogBox(){ 
    this.setState({ isDialogVisible: !this.state.isDialogVisible }); 
  }

  render(){
    return(
      <TouchableOpacity style={{borderBottomWidth: 0.5, borderBottomColor: "grey"}} onPress={()=>{this.toggleDialogBox()}}>
        <View style={{justifyContent: 'center', width: Dimensions.get('window').width, height: 50, backgroundColor: 'white' }}>
          <Text style={{textAlign: 'left', paddingLeft: 10}}>{this.props.displayName}</Text> 
          <Text style={{textAlign: 'right', paddingRight: 10}}>{this.state.value}</Text>
        </View>
        <Modal 
          onBackdropPress={() => this.toggleDialogBox()}
          style={{alignContent: 'center'}} 
          isVisible={this.state.isDialogVisible}
        >
          <View>
            <FlatList
              data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }]}
              renderItem={
                ({ item }) =>
                  <TouchableOpacity 
                    onPress={ () => {
                      this.sendInput(item.key); 
                      this.toggleDialogBox(); 
                    }} 
                    style={{backgroundColor:'white'}}
                  >
                    <Text>{item.key}</Text>
                  </TouchableOpacity>
              }
            />
          </View>
        </Modal>
        {/* <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={this.props.displayName}
          submitInput={ inputText => {
            this.sendInput(inputText); 
            this.toggleDialogBox(); 
          }}
          closeDialog={ () => {this.toggleDialogBox()}}>
        </DialogInput> */}
      </TouchableOpacity>   
    );
  }
}