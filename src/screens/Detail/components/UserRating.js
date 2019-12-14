import React, { Component } from 'react';
import { 
    View, 
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { UserRatingStyles } from '../styles';

export default class UserRating extends Component {
    constructor(props){
        super(props);
        this.state = {
          dialogBoxText: ''
        }
    }

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

         const { dialogBoxText } = this.state;

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

                <Modal 
                    onBackdropPress={() => toggleDialogBox()}
                    style={{alignSelf:"center"}}
                    isVisible={isDialogVisible}
                >
                    <View style={UserRatingStyles.popupTextInputContainer}>

                        {/* Header */}
                        <View style={UserRatingStyles.popupInputTextHeader}>
                            <Text style={UserRatingStyles.popupTextInputTitle}>Send your thoughts!</Text>
                            <TouchableOpacity 
                            onPress={() => this.setState({dialogBoxText: ''}) } 
                            style={UserRatingStyles.refreshIcon}
                            >
                            <Ionicons name="md-refresh" size={20} color={"white"} />  
                            </TouchableOpacity>
                        </View>

                        {/* Text Input Area */}
                        <TextInput
                            maxLength={1000}
                            style={UserRatingStyles.popupTextInputArea}
                            onChangeText={text => this.setState({dialogBoxText: text})}
                            value={dialogBoxText}
                            multiline={true}
                        />

                        {/* Buttons */}
                        <View style={UserRatingStyles.popupButtonContainer}>
                            <TouchableOpacity onPress={() => toggleDialogBox()} style={UserRatingStyles.popupInputTextButton}>
                                <Text style={UserRatingStyles.popupCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => {
                                    submitComment(dialogBoxText); 
                                    toggleDialogBox(); 
                                }} 
                                style={UserRatingStyles.popupInputTextButton}
                            >
                                <Text style={UserRatingStyles.popupSubmitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
		);
	}
}
