import React, { Component } from 'react';
import { 
	Alert,
	Button,
	Dimensions,
	Image,
	Text,
	TouchableOpacity, 
	View, 
} from 'react-native';
import './components/Detail';
import styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from '../../helpers/DbHandler';
import Detail from './components/Detail';
import Barcode from '../../helpers/Barcode';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import StarRating from 'react-native-star-rating';
import { 
	Colors, 
	StringConcatenations, 
	Warnings 
} from '../../helpers/Constants';

export default class DetailScreen extends Component {
	constructor(props) {
    	super(props);
		this.dbHandler = new DbHandler();
		this.maxStars = 5;
		this.results = this.props.navigation.getParam('results', {});
		this.navigateOnSuccessfulDelete = this.navigateOnSuccessfulDelete.bind(this); 
		this.updateIsFlagged = this.updateIsFlagged.bind(this); 
		this.updateNumStarRatings = this.updateNumStarRatings.bind(this); 

		this.state = {
			isFlagged : false,
			numStarRatings : 0,
			rating: 0
		};
	}

	componentWillMount(){
		this.initializeScreen();
	}

	initializeScreen(){
		this.checkItemIsFlagged();
		this.getNumStarRatings();
	}

	checkItemIsFlagged(){
		const { barcodeType, barcodeData } = this.results;
		let currBarcode = new Barcode(barcodeType, barcodeData);
		let flagsPerUserRef = this.dbHandler.getRef("FlagsPerUser");
		let checkItemIsFlaggedCallbacksAndParams = new CallbacksAndParams(
			currBarcode, 
			this.updateIsFlagged, 
			function(){}
		);
		this.dbHandler.getData(flagsPerUserRef, checkItemIsFlaggedCallbacksAndParams);
	}

	updateIsFlagged(resultsAndParams){
		let currBarcode = resultsAndParams.params;
		let results = resultsAndParams.results.data();
		let isFlagged = false;

		if(currBarcode.data in results){
			if(results[currBarcode.data] == currBarcode.type){
				isFlagged = true;
			}
		}
		
		this.setState({ isFlagged : isFlagged });
	}

	getNumStarRatings(rating=null){
		const { barcodeType, barcodeData } = this.results;
		let currBarcode = new Barcode(barcodeType, barcodeData);
		let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, currBarcode);
		let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateNumStarRatings, 
			function(){}
		);
		this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
	}

	updateNumStarRatings(resultsAndParams){
		let results = resultsAndParams.results.data();
		
		if(results.numStarRatings){
			this.setState({  numStarRatings : results.numStarRatings });
		}
	}

	static navigationOptions = ({ navigation }) => ({
		title: "Item Details",
		headerStyle: {
			backgroundColor: Colors.Primary,
		},
		headerTitleStyle: {
			color: 'white'
		},
		headerLeft: (
			<TouchableOpacity style={styles.headerButton}>
				<Ionicons name="md-arrow-back" size={25} onPress={() => navigation.popToTop()} color="white" />
			</TouchableOpacity>
		),		
	})

	promptDeleteItem(){
		Alert.alert(
			Warnings.ConfirmDeletion,
			"",
    		[
				{ text: 'Delete', onPress: () => this.deleteItem() },
				{ text: 'Cancel', style: 'cancel' }
      		],
      		{ cancelable: false }
    	);
	}

	deleteItem(){
		const { barcodeType, barcodeData } = this.results;
		let barcodeToDelete = new Barcode(barcodeType, barcodeData);
		let detailRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcodeToDelete);

		let deleteItemCallbackAndParams = new CallbacksAndParams(
			barcodeToDelete, 
			this.navigateOnSuccessfulDelete, 
			function(){}
		);

		this.dbHandler.deleteItem(detailRef, deleteItemCallbackAndParams);
	}

	navigateOnSuccessfulDelete(){
		this.props.navigation.popToTop();
	}

	promptFlagItem(currBarcode){
		if(this.state.isFlagged){
			this.unflagItem(currBarcode);
		}
		else{
			Alert.alert(
				"Are you sure you want to flag this item for innappropriate content?",
				"",
				[
					{ text: 'Flag', onPress: () => this.flagItem(currBarcode) },
					{ text: 'Cancel', style: 'cancel' }
				],
				{ cancelable: false }
			);
		}
	}

	unflagItem(currBarcode){
		const fieldName = "numFlags";
		const decrementAmount = -1;
		this.dbHandler.incrementValue(
			StringConcatenations.Prefix, 
			fieldName, 
			decrementAmount, 
			currBarcode);

		let flagsPerUserRef = this.dbHandler.getRef("FlagsPerUser");
		this.dbHandler.deleteFieldFromDocument(flagsPerUserRef, currBarcode);
		this.setState({ isFlagged : false });
	}

	flagItem(currBarcode){
		const fieldName = "numFlags";
		const incrementAmount = 1;
		this.dbHandler.setData('FlagsPerUser', { [currBarcode.data] : currBarcode.type });
		this.dbHandler.incrementValue(
			StringConcatenations.Prefix, 
			fieldName, 
			incrementAmount, 
			currBarcode);
		this.setState({ isFlagged : true });
	}

	onStarRatingPress(rating, currBarcode, uuid){
		const data = {
			lastUpdated: new Date(),
			chocolateUuid: uuid,
			barcodeData: currBarcode.data,
			barcodeType: currBarcode.type,
			rating: rating,
			userid: this.dbHandler.currUser.uid
		};

		let starRatingsPerUserRef = this.dbHandler.getRef("StarRatingsPerUser", barcode=null, barcodeUuid=uuid);
		starRatingsPerUserRef.set(data, { merge : true });
	
		this.setState({ rating: rating });
	}

	render() {
		const { navigation } = this.props;
		const { 
			barcodeData,
			barcodeType, 
			producerName, 
			confectionName,
			imageDownloadUrl, 
			type,
			uuid
		} = this.results;

		const shouldUserEditItem = navigation.getParam('shouldUserEditItem', false);
		const currBarcode = new Barcode(barcodeType, barcodeData);
		
		return (
			<View style={{flex: 1, flexWrap: 'wrap' }}>
				<Image 
					style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height/3}}
					source={{ uri : imageDownloadUrl }}
                />
				<View style={{
					flexDirection: "row"
				}}>
					<View style={{
						width: Dimensions.get('window').width / 2,
						height: 100,
						backgroundColor:"white"
					}}>
						<Text style={{paddingLeft: 15, fontSize:20, color:'rgba(0, 0, 0, .4)'}}> {producerName} </Text>
						<Text style={{paddingLeft: 15, fontSize:23, fontWeight:'bold'}}> {confectionName} </Text>
					</View>

					<View style={{
						width: Dimensions.get('window').width / 2,
						height: 100,
						backgroundColor:"white",
						justifyContent: 'center'
					}}>	
						<Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
							<Ionicons name="md-star" size={30} color="gold" /> 4.5
						</Text>

						<Text style={{textAlign:"center", color:'rgba(0, 0, 0, .4)'}}>{this.state.numStarRatings} Ratings</Text>
					</View>
				</View>

				<View style={{paddingLeft:15, paddingRight:15}}>
					<StarRating
						disabled={false}
						maxStars={this.maxStars}
						rating={this.state.rating}
						selectedStar={rating => this.onStarRatingPress(rating, currBarcode, uuid)}
						fullStarColor={"gold"}
					/>
				</View>
			  </View>
			// <View style={{flex:1}}>
			// 	<Image 
            //         style={{flex:1, width: Dimensions.get('window').width, height: 200}}
            //         source={{ uri : imageDownloadUrl }}
            //     />

			// 	<View style={{flex:1, paddingLeft:5, paddingRight:5, width: Dimensions.get('window').width, height: 50, backgroundColor: 'white'}}>
			// 		<View style={{flex:1}}>
			// 			<Text style={{fontSize:20, color:'rgba(0, 0, 0, .4)'}}> {this.props.producerName} </Text>
			// 			<Text style={{fontSize:23, fontWeight:'bold'}}> {this.props.confectionName} </Text>
			// 			<Text style={{fontSize:23, fontWeight:'bold'}}> {this.props.confectionName} </Text>
			// 		</View>
					
			// 		<View>

			// 		</View>
			// 	</View>

			// 	{/* <Detail 
			// 		style={{flex:1, paddingLeft:5, paddingRight:5, width: Dimensions.get('window').width, height: 50, backgroundColor: 'white'}}
			// 		producerName={producerName} 
			// 		confectionName={confectionName}
			// 	/> */}
			// 	{/* <Detail title={producerName} />
			// 	<Detail title={type} /> */}
			// 	<Ionicons 
			// 		name="md-flag" 
			// 		size={32} 
			// 		color={this.state.isFlagged ? "red" : "grey"} 
			// 		onPress={() => this.promptFlagItem(currBarcode) }
			// 	/>
			// 	<StarRating
			// 		disabled={false}
			// 		maxStars={this.maxStars}
			// 		rating={this.state.numStarRatings}
			// 		selectedStar={rating => this.onStarRatingPress(rating)}
			// 		fullStarColor={"gold"}
			// 	/>

			// 	{ shouldUserEditItem ? 
			// 		<View>
			// 			<Button 
			// 				title="Delete"
			// 				onPress={() => this.promptDeleteItem() } 
			// 				styles={styles.button}
			// 			/> 
						
			// 			<Button 
			// 				title="Edit Chocolate"
			// 				onPress={() => navigation.navigate(
			// 					"EditChocolateScreen", 
			// 					{ barcode: currBarcode, entries: this.results })} 
			// 				styles={styles.button}
			// 			/>
			// 		</View> 
			// 	: null }
			// </View>
		);
	}
}