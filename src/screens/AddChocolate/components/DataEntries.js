import React, { Component } from 'react';
import { 
    View,
    Button
} from 'react-native';
import { StringConcatenations } from '../../../helpers/Constants';
import Entry from './Entry';
import DbHandler from '../../../helpers/DbHandler'
import styles from '../../../styles';

export default class DataEntries extends Component {
    constructor(props){
        super(props);
        this.updateInput = this.updateInput.bind(this); 
        this.dbHandler = new DbHandler();
        this.inputValues = {};
    }

    updateInput(input){
        this.inputValues[input['field']] = input['value'];
    }
    
    submitInput(inputValues){
        let barcodeTypeRef = this.dbHandler.getRef(
            StringConcatenations.Prefix, 
            this.props.barcodeType, 
            this.props.barcodeData);
        let myChocolatesRef = this.dbHandler.getRef('MyChocolates');
        barcodeTypeRef.set(inputValues);
        myChocolatesRef.set(
            { [this.props.barcodeData] : this.props.barcodeType }, 
            { merge : true});
        this.props.navigate("DetailScreen", { results : inputValues });
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