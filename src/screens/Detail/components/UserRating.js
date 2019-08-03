import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';
import DialogInput from 'react-native-dialog-input';
import { Colors } from '../../../helpers/Constants';

export default class UserRating extends Component {
	render() {
        const { 
            maxStars,
            rating,
            currBarcode,
            onStarRatingPress,
            uuid,
            isDialogVisible,
            submitComment,
            toggleDialogBox
         } = this.props;

		return (
			<View style={{padding:15, paddingLeft:110, paddingRight:110, borderBottomColor: Colors.Primary, borderBottomWidth: .5}}>
                <StarRating
                    starSize={20}
                    disabled={false}
                    maxStars={maxStars}
                    rating={rating}
                    selectedStar={rating => onStarRatingPress(rating, currBarcode, uuid)}
                    fullStarColor={"gold"}
                />
                <Text style={{fontSize:12, paddingTop:5, color:'rgba(0, 0, 0, .4)', textAlign:'center'}}>Tap to rate</Text>
                <DialogInput 
                    isDialogVisible={isDialogVisible}
                    title={"What did you think about this chocolate?"}
                    submitInput={ inputText => {
                        submitComment(inputText); 
                        toggleDialogBox(); 
                    }}
                    cancelText={"No thanks"}
                    closeDialog={ () => { toggleDialogBox() }}>
                </DialogInput>
            </View>
		);
	}
}