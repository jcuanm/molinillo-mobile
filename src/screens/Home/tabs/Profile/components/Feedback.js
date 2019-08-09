import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Dimensions,
 } from 'react-native';
 import DialogInput from 'react-native-dialog-input';
 import { Colors } from '../../../../../helpers/Constants';
 
export default class Feedback extends Component {
    constructor(props) {
    	super(props);

		this.state = {
			isDialogVisible: false,
		};
    }
    
    render(){
        const { isDialogVisible } = this.state;

        return(
            <TouchableOpacity onPress={() => this.toggleDialogBox()}>
                <View style={{justifyContent:'center', width: Dimensions.get('window').width, height: 50, backgroundColor: Colors.Primary }}>
                    <Text style={{fontWeight:'bold', color:"white", paddingLeft:15}}>{this.props.title}</Text> 
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
        console.log("Submit");
    }
}