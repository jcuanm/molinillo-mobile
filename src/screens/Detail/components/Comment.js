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
import StarRating from 'react-native-star-rating';

export default class Comment extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
        this.maxStars = 5;
    }

    render(){
        const { comment, created_ts, displayName, rating} = this.props.item;
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
                    marginBottom:8
                }
            }>
                <View style={{paddingLeft: 15}}>
                    <Text style={{fontWeight:'bold', paddingBottom: 3}}>
                        {displayName} <Text style={{fontSize: 12, fontWeight:'normal', fontStyle:'italic', color:'rgba(0, 0, 0, .4)'}}> {date_created_string_format} </Text>
                    </Text>

                    <View style={{paddingRight: Dimensions.get("window").width * .75 }}>
                        <StarRating
                            starSize={15}
                            disabled={true}
                            maxStars={this.maxStars}
                            rating={rating}
                            fullStarColor={"gold"}
                        />
                    </View>

                    <Text style={{fontSize:12, paddingBottom: 5}}>
                        {comment}
                    </Text>
                </View>
            </View>
        );
    }
}