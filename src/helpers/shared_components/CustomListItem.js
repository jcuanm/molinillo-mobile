import React, { Component } from 'react';
import { 
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from '../DbHandler';
import Barcode from '../Barcode';
import { CustomListItemStyles } from './styles';

export default class CustomListItem extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
        this.maxStars = 5;
    }

    render(){
        const { 
            navigate, 
            parentScreen,
            results
        } = this.props;

        const{ 
            confectionName, 
            producerName,
            imageDownloadUrl,
            numStarRatings,
            sumRatings
        } = results;

        return(
            <TouchableOpacity
                style={CustomListItemStyles.container}
                onPress={ () => { 
                    navigate(
                        "DetailScreen",
                        { results : results }
                    );
                
                    this.updateSearchClickMetaData(results, parentScreen);
                }}
            >
                <Image 
                    style={CustomListItemStyles.listingImage}
                    source={{ uri : imageDownloadUrl }}
                />
                <ListItem
                    title={<Text style={CustomListItemStyles.listingTitle}>{ producerName }</Text>}
                    subtitle={
                        <View>
                            <Text>{ confectionName }</Text>
                            { 
                                sumRatings && numStarRatings ? 
                                    <Text style={CustomListItemStyles.listingSubtitle}> 
                                        <Ionicons name="md-star" size={15} color="gold" />   
                                        {(sumRatings / numStarRatings) ? (sumRatings / numStarRatings).toFixed(1) : " "}
                                    </Text>
                                :
                                    null
                            }
                        </View>
                    }
                />
            </TouchableOpacity>
        );
    }

    updateSearchClickMetaData(results, parentScreen){
        const { barcodeType, barcodeData, uuid } = results;
        const currBarcode = new Barcode(barcodeType, barcodeData);

        let data = {
            created_ts: new Date(),
            userId: this.dbHandler.currUser.uid,
            parentScreen: parentScreen,
            barcodeData: currBarcode.data,
            barcodeType: currBarcode.type,
            uuid: uuid
        }

        // Checking if the chocolate has a barcode
        if(barcodeType !== "None" && barcodeData !== "None"){
            data["barcodeType"] = barcodeType;
            data["barcodeData"] = barcodeData;
        }

        // Update the search click meta data 
        let scansRef = this.dbHandler.getRef("SearchClicks");
        scansRef.set(data, { merge : true });
    }
}