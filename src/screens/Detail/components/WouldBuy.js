import React, { Component } from 'react';
import {
    Alert,
	View,
    Text,
    TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import DbHandler from '../../../helpers/DbHandler';
import Dialog from "react-native-dialog";
import { WouldBuyStyles } from '../styles';

export default class WouldBuy extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();

		this.state = {
            reason: "",
            isDialogVisible: false
		};
    }

	render() {
		return (
            <View style={WouldBuyStyles.border}>
                <View style={WouldBuyStyles.container}>
                    <View style={WouldBuyStyles.column} >
                        <Text style={WouldBuyStyles.purchaseText}>
                            Chocolate not for sale
                        </Text>
                        <Text style={WouldBuyStyles.subtitle}> 
                            Would you buy this chocolate if it were for sale?
                        </Text>
                    </View>
                </View>

                <View style={WouldBuyStyles.row}>
                    <TouchableOpacity 
                        onPress={() => this.setState({isDialogVisible: true})} 
                        style={[WouldBuyStyles.reasonButton, {backgroundColor:"green"}]}
                    >
                        <Text style={WouldBuyStyles.buttonText}>
                            Yes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.setState({isDialogVisible: true})} 
                        style={[WouldBuyStyles.reasonButton, {backgroundColor:"red"}]}
                    >
                        <Text style={WouldBuyStyles.buttonText}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pop-up dialog box for feedback */}
                <Dialog.Container visible={this.state.isDialogVisible}>
                    <Dialog.Title>Reason</Dialog.Title>
                    <Dialog.Description>
                       (Optional)
                    </Dialog.Description>
                    <Dialog.Input onChangeText={text => this.setState({reason: text})}></Dialog.Input>
                    <Dialog.Button label="Confirm" onPress={() => this.submitFeedback()} />
                    <Dialog.Button label="Cancel" onPress={() => this.setState({isDialogVisible: false})} />
                </Dialog.Container>
            </View>
		);
    }

    submitFeedback(){
        Alert.alert(
            "Thank you for your feedback!",
            "",
            [
                {
                    text: "Ok",
                    onPress: () => this.setState({isDialogVisible: false})
                }
            ],
            { cancelable: false }
        );
    }
}
