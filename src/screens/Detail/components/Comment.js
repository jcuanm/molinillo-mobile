import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DbHandler from '../../../helpers/DbHandler';
import { Months } from '../../../helpers/Constants';
import StarRating from 'react-native-star-rating';
import { CommentStyles } from '../styles';

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
            <View style={CommentStyles.container}>
                <Text style={CommentStyles.displayName}>
                    {displayName} <Text style={CommentStyles.dateCreated}> {date_created_string_format} </Text>
                </Text>

                <View style={CommentStyles.starRating}>
                    <StarRating
                        starSize={15}
                        disabled={true}
                        maxStars={this.maxStars}
                        rating={rating}
                        fullStarColor={"gold"}
                    />
                </View>

                <Text style={CommentStyles.commentText}>
                    {comment}
                </Text>
            </View>
        );
    }
}
