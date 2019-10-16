import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';
import DialogInput from 'react-native-dialog-input';
import { UserRatingStyles } from '../styles';

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
			<View style={UserRatingStyles.container}>
                <StarRating
                    starSize={20}
                    disabled={false}
                    maxStars={maxStars}
                    rating={rating}
                    selectedStar={rating => onStarRatingPress(rating, currBarcode, uuid)}
                    fullStarColor={"gold"}
                />
                <Text style={UserRatingStyles.subtext}>Tap to rate</Text>
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