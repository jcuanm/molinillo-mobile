import React, { Component } from 'react';
import { 
    View,
    Button
} from 'react-native';
import * as firebase from 'firebase';
import Entry from './Entry';
import styles from '../../../styles';

export default class DataEntries extends Component {
    constructor(props){
        super(props);
        this.inputValues = {};
        this.updateInput = this.updateInput.bind(this); 
        this.db = firebase.firestore();
        this.currUser = firebase.auth().currentUser;
    }

    updateInput(input){
        this.inputValues[input['field']] = input['value'];
        console.log("BarcodeType", this.props.barcodeType);
        console.log("BarcodeData", this.props.barcodeData);
        console.log(this.inputValues);
    }
    
    submitInput(inputValues){
        let confectionsRef = this.db.collection("confections")
            .doc(this.props.barcodeType.toString())
            .collection("barcodeData")
            .doc(this.props.barcodeData.toString());

        return this.db.runTransaction(transaction => {
            return transaction.get(confectionsRef)
                .then(res => {
                    if (!res.exists){
                        console.log("Document does not exist!");
                    }
                    
                    transaction.set(confectionsRef, inputValues);
                    this.props.addToMyChocolates(this.props.barcodeType, this.props.barcodeData, inputValues);
                }) 
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Entry 
                        title={"Confection Name"} 
                        updateInput={this.updateInput}
                        // popup={"MyChocolatesScreen"} 
                        // navigationFunc={this.props.navigationFunc} 
                    />
                    <Entry 
                        title={"Brand"} 
                        updateInput={this.updateInput}
                        // navigateScreen={"RatingsScreen"} 
                        // navigationFunc={this.props.navigationFunc} 
                    />
                    <Entry 
                        title={"Type"} 
                        updateInput={this.updateInput}
                        // navigateScreen={"WishlistScreen"} 
                        // navigationFunc={this.props.navigationFunc} 
                    />
                    <Entry 
                        title={"Cacao Variety"} 
                        updateInput={this.updateInput}
                        // navigateScreen={"WishlistScreen"} 
                        // navigationFunc={this.props.navigationFunc} 
                    />
                    <Entry 
                        title={"Country of Origin"} 
                        updateInput={this.updateInput}
                        // navigateScreen={"WishlistScreen"} 
                        // navigationFunc={this.props.navigationFunc} 
                    />
                </View>
                <Button
                    title="Submit"
                    onPress={() => this.submitInput(this.inputValues)}
                    styles={styles.button}
                />
            </View>
        );
    }
}