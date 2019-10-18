import React, { Component } from 'react';
import { 
  FlatList,
  View, 
  Text,
  TouchableOpacity,
 } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Modal from 'react-native-modal';
import { dialogOptionsDatasets } from '../../../helpers/Constants';
import { EntryStyles } from '../styles';

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
      <TouchableOpacity style={EntryStyles.border} onPress={()=>{this.toggleDialogBox()}}>
        <View style={EntryStyles.container}>
          <Text style={EntryStyles.displayName}> {this.props.displayName} </Text> 
          <Text style={EntryStyles.value}> {this.state.value} </Text>
        </View>

        {this.getDialogBox()}

      </TouchableOpacity>   
    );
  }

  getDialogBox(){
    const { dialogType } = this.props;

    if(dialogType === "options")
      return this.renderOptionsDialog();
    else if(dialogType === "typing")
      return this.renderTypingDialog();
    else
      return(<View></View>)
  }

  renderOptionsDialog(){
    return(
      <Modal 
        onBackdropPress={() => this.toggleDialogBox()}
        style={EntryStyles.popupModal} 
        isVisible={this.state.isDialogVisible}
      >
        <View style={EntryStyles.popupFlatlistContainer}>
          <FlatList
            data={dialogOptionsDatasets[this.props.id]}
            renderItem={
              ({ item }) =>
                <TouchableOpacity 
                  onPress={ () => {
                    this.sendInput(item.key); 
                    this.toggleDialogBox(); 
                  }} 
                  style={EntryStyles.popupEntriesBackground}
                >
                  <Text style={EntryStyles.popupEntriesText}>{item.key}</Text>
                </TouchableOpacity>
            }
          />
        </View>
      </Modal>
    );
  }

  renderTypingDialog(){
    return(
      <DialogInput isDialogVisible={this.state.isDialogVisible}
        title={this.props.displayName}
        submitInput={ inputText => {
          this.sendInput(inputText); 
          this.toggleDialogBox(); 
        }}
        closeDialog={ () => {this.toggleDialogBox()}}>
      </DialogInput>
    );
  }
}