import React, { Component } from 'react';
import { 
  FlatList,
  View, 
  Text,
  TouchableOpacity,
 } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { dialogOptionsDatasets, Colors } from '../../../helpers/Constants';
import { EntryStyles } from '../styles';
import { TextInput } from 'react-native-paper';

export default class Entry extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      isDialogVisible: false,
      dialogBoxText: ''
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
          <Text style={EntryStyles.displayName}> 
            {this.props.displayName}
          </Text>
          <Text style={EntryStyles.displayValue}>
            {this.state.value}
          </Text>
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
      <Modal 
        onBackdropPress={() => this.toggleDialogBox()}
        isVisible={this.state.isDialogVisible}
      >
        <View style={EntryStyles.popupTextInputContainer}>

          {/* Header */}
          <View style={EntryStyles.popupInputTextHeader}>
            <Text style={EntryStyles.popupTextInputTitle}>{this.props.displayName}</Text>
            <TouchableOpacity 
              onPress={() => this.setState({dialogBoxText: ''}) } 
              style={EntryStyles.refreshIcon}
            >
              <Ionicons name="md-refresh" size={20} color={Colors.Primary} />  
            </TouchableOpacity>
          </View>

          {/* Text Input Area */}
          <TextInput
            style={EntryStyles.popupTextInputArea}
            onChangeText={text => this.setState({dialogBoxText: text})}
            value={this.state.dialogBoxText}
            multiline={true}
          />

          {/* Buttons */}
          <View style={EntryStyles.popupButtonContainer}>
            <TouchableOpacity onPress={() => this.toggleDialogBox()} style={EntryStyles.popupInputTextButton}>
              <Text style={EntryStyles.popupCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                this.sendInput(this.state.dialogBoxText); 
                this.toggleDialogBox(); 
              }} 
              style={EntryStyles.popupInputTextButton}
            >
              <Text style={EntryStyles.popupSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
