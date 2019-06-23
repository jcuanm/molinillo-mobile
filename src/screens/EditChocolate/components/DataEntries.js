import React, { Component } from 'react';
import { 
    View,
    Button
} from 'react-native';
import { StringConcatenations } from '../../../helpers/Constants';
import ImageArea from './ImageArea';
import Entry from './Entry';
import DbHandler from '../../../helpers/DbHandler'
import styles from '../../../styles';

export default class DataEntries extends Component {
    constructor(props){
        super(props);
        this.updateInput = this.updateInput.bind(this); 
        this.dbHandler = new DbHandler();
        this.inputValues = this.props.entries;
    }

    updateInput(input){
        this.inputValues[input['field']] = input['value'];
    }
    
    submitInput(inputValues){
        const { barcode, popToTop } = this.props;

        let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
        let myChocolatesRef = this.dbHandler.getRef('MyChocolates');

        barcodeTypeRef.set(inputValues);
        myChocolatesRef.set( { [barcode.data] : barcode.type }, { merge : true });
        
        popToTop();
    }

    render(){
        const {
            brand,
            cacaoVariety,
            confectionName,
            countryOfOrigin,
            imageDownloadUrl,
            type,
        } = this.props.entries;

        return(
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <ImageArea 
                        id={"image"} 
                        displayName={"Image"}
                        barcode={this.props.barcode}
                        imageDownloadUrl={imageDownloadUrl}
                        updateInput={this.updateInput}
                    />
                    <Entry 
                        id={"confectionName"} 
                        displayName={"Confection Name"}
                        updateInput={this.updateInput}
                        currValue={confectionName}
                    />
                    <Entry 
                        id={"brand"}
                        displayName={"Brand"} 
                        updateInput={this.updateInput}
                        currValue={brand} 
                    />
                    <Entry 
                        id={"type"}
                        displayName={"Type"} 
                        updateInput={this.updateInput}
                        currValue={type} 
                    />
                    <Entry 
                        id={"cacaoVariety"} 
                        displayName={"Cacao Variety"}
                        updateInput={this.updateInput}
                        currValue={cacaoVariety} 
                    />
                    <Entry 
                        id={"countryOfOrigin"}
                        displayName={"Country of Origin"} 
                        updateInput={this.updateInput}
                        currValue={countryOfOrigin} 
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