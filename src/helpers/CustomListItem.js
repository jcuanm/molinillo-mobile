import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from './DbHandler';
import Barcode from './Barcode';

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
                style={{paddingBottom: 10}}
                onPress={ () => { 
                    navigate(
                        "DetailScreen",
                        { 
                            results : results
                        });
                
                    this.updateSearchClickMetaData(results, parentScreen);
                }}
            >
                <Image 
                    style={{width: Dimensions.get('window').width, height: 200}}
                    source={{ uri : imageDownloadUrl }}
                />
                <ListItem
                    title={<Text style={{fontWeight:"bold"}}>{ producerName }</Text>}
                    subtitle={
                        <View>
                            <Text>{ confectionName }</Text>
                            { 
                                sumRatings && numStarRatings ? 
                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}> 
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
            user: this.dbHandler.currUser.uid,
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