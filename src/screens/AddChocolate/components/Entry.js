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
            'field' : this.props.title,
            'value' : inputText
        }

        this.props.updateInput(currentInput);
        this.setState({value: inputText});
    }

    showDialog(isShow){ this.setState({isDialogVisible: isShow}); }

    render(){
        return(
            <TouchableOpacity onPress={()=>{this.showDialog(true)}}>
                <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: 'powderblue'}}>
                    <Text>{this.props.title}</Text> 
                    <Text style={{textAlign: 'right'}}>{this.state.value}</Text>
                </View>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"DialogInput 1"}
                    message={"Message for DialogInput #1"}
                    hintInput ={"HINT INPUT"}
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