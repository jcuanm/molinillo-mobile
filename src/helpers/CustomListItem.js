import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text, 
    TouchableOpacity 
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { StringConcatenations } from './Constants';
import DbHandler from './DbHandler';
import Barcode from './Barcode';

export default class CustomListItem extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
    }

    render(){
        const { 
            navigate, 
            results, 
            title, 
            shouldUserEditItem,
            subtitle,
        } = this.props;

        return(
            <TouchableOpacity
                onPress={ () => { 
                    navigate(
                        "DetailScreen",
                        { 
                            results : results, 
                            shouldUserEditItem : shouldUserEditItem,
                        });
                
                    this.updateSearchClickMetaData(results);
                }}
            >
                <Image 
                    style={{width: Dimensions.get('window').width, height: 200}}
                    source={{ uri : results.imageDownloadUrl }}
                />
                <ListItem
                    title={<Text>{ title }</Text>}
                    // subtitle={<Text>{ subtitle }</Text>}
                />
            </TouchableOpacity>
        );
    }

    updateSearchClickMetaData(results){
        const { barcodeType, barcodeData } = results;
        const currBarcode = new Barcode(barcodeType, barcodeData);

        // Increment number of clicks gained from user using the search feature
        const incrementAmount = 1;
        const fieldName = "numSearchClicks";
        this.dbHandler.incrementValue(
            StringConcatenations.Prefix, 
            fieldName, 
            incrementAmount, 
            currBarcode);

        // Update the search click meta data 
        let scansPerDatetimeRef = this.dbHandler.getRef("SearchClicksPerDatetime");
        scansPerDatetimeRef.set({
            time: new Date(),
            user: this.dbHandler.currUser.uid,
            barcodeData: currBarcode.data,
            barcodeType: currBarcode.type
        },{ merge : true });
    }
}