import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text, 
    TouchableOpacity,
    View
} from 'react-native';
import { ListItem } from 'react-native-elements';
import DbHandler from '../../../helpers/DbHandler';
import Barcode from '../../../helpers/Barcode';
import { Colors, Months } from '../../../helpers/Constants';

export default class Comment extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
    }

    render(){
        const { comment, created_ts, displayName } = this.props.item;
        let date_created = created_ts.toDate();
        let date_created_string_format = 
            Months[date_created.getMonth()] + " " +
            date_created.getDate() + ', ' + 
            date_created.getFullYear();

        return(
            <View 
                style={{
                    backgroundColor:"white", 
                    width:Dimensions.get("window").width,
                    marginBottom:5
                }
            }>
                <View style={{paddingLeft: 15}}>
                    <Text style={{fontWeight:'bold', paddingBottom: 3}}>
                        {displayName} <Text style={{fontSize: 12, fontWeight:'normal', fontStyle:'italic', color:'rgba(0, 0, 0, .4)'}}> {date_created_string_format} </Text>
                    </Text>
                    <Text style={{fontSize:12}}>
                        {comment}
                    </Text>
                </View>
            </View>
        );
    }
}