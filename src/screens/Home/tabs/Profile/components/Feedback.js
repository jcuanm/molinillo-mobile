import React, { Component } from 'react';
import { 
    Alert,
    View, 
    TextInput,
    Text, 
    TouchableOpacity,
 } from 'react-native';
 import Modal from 'react-native-modal';
 import { Ionicons } from '@expo/vector-icons';
 import DbHandler from '../../../../../helpers/DbHandler';
 import { ProfileNavTabStyles, FeedbackStyles } from '../styles';

export default class Feedback extends Component {
    constructor(props) {
    	super(props);

        this.dbHandler = new DbHandler();
		this.state = {
            isDialogVisible: false,
            dialogBoxText: ''
		};
    }
    
    render(){
        const { isDialogVisible, dialogBoxText } = this.state;

        return(
            <TouchableOpacity onPress={() => this.toggleDialogBox()}>
                <View style={ProfileNavTabStyles.container}>
                    <Text style={ProfileNavTabStyles.text}>{this.props.title}</Text> 
                </View>
                <Modal 
                    onBackdropPress={() => this.toggleDialogBox()}
                    style={FeedbackStyles.modalContainer}
                    isVisible={isDialogVisible}
                >
                    <View style={FeedbackStyles.popupTextInputContainer}>

                        {/* Header */}
                        <View style={FeedbackStyles.popupInputTextHeader}>
                            <Text style={FeedbackStyles.popupTextInputTitle}>{this.props.title}</Text>
                            <TouchableOpacity 
                            onPress={() => this.setState({dialogBoxText: ''}) } 
                            style={FeedbackStyles.refreshIcon}
                            >
                            <Ionicons name="md-refresh" size={20} color={"white"} />  
                            </TouchableOpacity>
                        </View>

                        {/* Text Input Area */}
                        <TextInput
                            maxLength={1000}
                            style={FeedbackStyles.popupTextInputArea}
                            onChangeText={text => this.setState({dialogBoxText: text})}
                            value={dialogBoxText}
                            multiline={true}
                        />

                        {/* Buttons */}
                        <View style={FeedbackStyles.popupButtonContainer}>
                            <TouchableOpacity onPress={() => this.toggleDialogBox()} style={FeedbackStyles.popupInputTextButton}>
                                <Text style={FeedbackStyles.popupCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.submitFeedback(dialogBoxText); 
                                    this.toggleDialogBox(); 
                                }} 
                                style={FeedbackStyles.popupInputTextButton}
                            >
                                <Text style={FeedbackStyles.popupSubmitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>   
        );
    }

    toggleDialogBox(){
        this.setState({ isDialogVisible: !this.state.isDialogVisible})
    }

    submitFeedback(inputText){
        if(!inputText){
            return;
        }

        const data = {
            userId: this.dbHandler.currUser.uid,
            email: this.dbHandler.currUser.email,
            username: this.dbHandler.currUser.displayName,
            created_ts: new Date(),
            feedback: inputText
        };
        
        let feedbackRef = this.dbHandler.getRef("Feedback");

        feedbackRef
            .set(data)
            .then( _ => {
                Alert.alert(
                    "Thanks for your feedback!",
                    "",
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            })
            .catch(error => {
                Alert.alert(
                    "Error sending feedback!",
                    "",
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
                console.log(error);
            });
    }
}
