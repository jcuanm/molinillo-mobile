import React, { Component } from 'react';
import { 
    Alert,
    View, 
    Text, 
    TouchableOpacity,
 } from 'react-native';
 import DialogInput from 'react-native-dialog-input';
 import DbHandler from '../../../../../helpers/DbHandler';
 import { ProfileNavTabStyles } from '../styles';

export default class Feedback extends Component {
    constructor(props) {
    	super(props);

        this.dbHandler = new DbHandler();
		this.state = {
			isDialogVisible: false,
		};
    }
    
    render(){
        const { isDialogVisible } = this.state;

        return(
            <TouchableOpacity onPress={() => this.toggleDialogBox()}>
                <View style={ProfileNavTabStyles.container}>
                    <Text style={ProfileNavTabStyles.text}>{this.props.title}</Text> 
                </View>

                <DialogInput 
                    isDialogVisible={isDialogVisible}
                    title={"What do you like about Molinillo? What should we improve?"}
                    submitInput={ inputText => {
                        this.submitFeedback(inputText); 
                        this.toggleDialogBox(); 
                    }}
                    cancelText={"Cancel"}
                    closeDialog={ () => this.toggleDialogBox() }>
                </DialogInput>
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