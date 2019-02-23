import React, { Component } from 'react';
import { 
    View,
    Button
} from 'react-native';
import Entry from './Entry';
import { Collections } from '../../../helpers/Constants';
import DbHandler from '../../../helpers/DbHandler'
import styles from '../../../styles';

export default class DataEntries extends Component {
    constructor(props){
        super(props);
        this.inputValues = {};
        this.updateInput = this.updateInput.bind(this); 
        this.dbHandler = new DbHandler();
    }

    updateInput(input){
        this.inputValues[input['field']] = input['value'];
        console.log("BarcodeType", this.props.barcodeType);
        console.log("BarcodeData", this.props.barcodeData);
        console.log(this.inputValues);
    }
    
    submitInput(inputValues){
        let confectionsRef = this.dbHandler.getRef(Collections['confections'], this.props.barcodeType, this.props.barcodeData);
        let myChocolatesRef = this.dbHandler.getRef(Collections['myChocolates'], this.props.barcodeType, this.props.barcodeData)
        confectionsRef.set(inputValues);
        myChocolatesRef.set(inputValues);
        this.props.navigate("DetailScreen", {results : inputValues});
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Entry 
                        title={"Confection Name"} 
                        updateInput={this.updateInput}
                    />
                    <Entry 
                        title={"Brand"} 
                        updateInput={this.updateInput} 
                    />
                    <Entry 
                        title={"Type"} 
                        updateInput={this.updateInput} 
                    />
                    <Entry 
                        title={"Cacao Variety"} 
                        updateInput={this.updateInput} 
                    />
                    <Entry 
                        title={"Country of Origin"} 
                        updateInput={this.updateInput} 
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