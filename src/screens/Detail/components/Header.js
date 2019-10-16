import React, { Component } from 'react';
import {
    Alert,
	View,
	Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CallbacksAndParams from '../../../helpers/CallbacksAndParams';
import DbHandler from '../../../helpers/DbHandler';
import { HeaderStyles } from '../styles';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.updateIsInMyChocolates = this.updateIsInMyChocolates.bind(this); 

		this.state = {
			isInMyChocolates : false,
		};
    }
    
    componentWillMount(){
        this.checkMyChocolates();
    }

    checkMyChocolates(){
		let myChocolatesRef = this.dbHandler.getRef("MyChocolates", null, this.props.uuid);
		let myChocolatesCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateIsInMyChocolates, 
			function(){}
		);
		this.dbHandler.getData(myChocolatesRef, myChocolatesCallbacksAndParams);
    }
    
    updateIsInMyChocolates(){
        this.setState({isInMyChocolates: true})
    }

	render() {
        const { numStarRatings, sumRatings } = this.props;
		return (
			<View style={HeaderStyles.container}>
                <View style={HeaderStyles.heartIcon}>
                    <Ionicons
                        name="md-heart"
                        size={30}
                        color={this.state.isInMyChocolates ? "red" : "grey"}
                        onPress={() => this.handleInMyChocolates()}
                    />
                </View>

                <View style={HeaderStyles.ratingBlock}>	
                    <Text style={HeaderStyles.starIcon}> 
                        <Ionicons 
                            name="md-star" 
                            size={30} 
                            color="gold" 
                        />   
                        {(sumRatings / numStarRatings) ? (sumRatings / numStarRatings).toFixed(1) : " "}
                    </Text>

                    <Text style={HeaderStyles.numRatingsText}>
                        {numStarRatings} <Text style={HeaderStyles.ratingsTitle}>ratings</Text>
                    </Text>
                </View>
            </View>
		);
    }
    
    handleInMyChocolates(){
        const { 
            barcodeType, 
            barcodeData, 
            uuid 
        } = this.props;

        let myChocolatesRef = this.dbHandler.getRef(
            "MyChocolates", 
            null, 
            uuid);

        if(this.state.isInMyChocolates){
            myChocolatesRef
                .delete()
                .then( _ => {
                    Alert.alert(
                        "Removed from my chocolates",
                        "",
                        [
                            {text: 'OK'}
                        ],
                        { cancelable: false }
                    );
                    this.setState({isInMyChocolates: false});
                })
        }
        else{
            const data = {
                created_ts: new Date(),
                userId: this.dbHandler.currUser.uid,
                uuid: uuid,
                barcodeData: barcodeData,
                barcodeType: barcodeType
            }
            
            myChocolatesRef
                .set(data)
                .then( _ => {
                    Alert.alert(
                        "Added to my chocolates",
                        "",
                        [
                            {text: 'OK'}
                        ],
                        { cancelable: false }
                    );
                    this.setState({isInMyChocolates: true});
                });
        }
    }
}
