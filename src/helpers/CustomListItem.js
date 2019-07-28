import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text, 
    TouchableOpacity 
} from 'react-native';
import { ListItem } from 'react-native-elements';
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
            parentScreen,
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
                
                    this.updateSearchClickMetaData(results, parentScreen);
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

    updateSearchClickMetaData(results, parentScreen){
        const { barcodeType, barcodeData } = results;
        const currBarcode = new Barcode(barcodeType, barcodeData);

        // Update the search click meta data 
        let scansRef = this.dbHandler.getRef("SearchClicks");
        scansRef.set({
            created_ts: new Date(),
            user: this.dbHandler.currUser.uid,
            parentScreen: parentScreen,
            barcodeData: currBarcode.data,
            barcodeType: currBarcode.type
        },{ merge : true });
    }
}