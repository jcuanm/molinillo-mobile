import React, { Component } from 'react';
import { 
	Alert,
	Dimensions,
	FlatList,
	Image,
	Linking,
	ScrollView,
	Text,
	TouchableOpacity, 
	View, 
} from 'react-native';
import styles from '../../styles';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from '../../helpers/DbHandler';
import Header from './components/Header';
import Description from './components/Description';
import UserRating from './components/UserRating';
import CacaoStats from './components/CacaoStats';
import CountryOrigin from './components/CountryOrigin';
import VendorAddress from './components/VendorAddress';
import VendorWebsite from './components/VendorWebsite';
import Barcode from '../../helpers/Barcode';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { 
	Colors, 
	StringConcatenations, 
	Warnings 
} from '../../helpers/Constants';
import Comment from './components/Comment';
const uuidv4 = require('uuid/v4');


export default class DetailScreen extends Component {
	constructor(props) {
    	super(props);
		this.dbHandler = new DbHandler();
		this.maxStars = 5;
		this.results = this.props.navigation.getParam('results', {});
		this.navigateOnSuccessfulDelete = this.navigateOnSuccessfulDelete.bind(this); 
		this.updateIsFlagged = this.updateIsFlagged.bind(this); 
		this.updateMetrics = this.updateMetrics.bind(this); 
		this.updateUserRating = this.updateUserRating.bind(this); 
		this.onStarRatingPress = this.onStarRatingPress.bind(this); 
		this.submitComment = this.submitComment.bind(this); 
		this.toggleDialogBox = this.toggleDialogBox.bind(this); 
		this.openWebpage = this.openWebpage.bind(this); 

		this.state = {
			isDialogVisible: false,
			isFlagged : false,
			numStarRatings : 0,
			rating: 0,
			comments: [],
			numComments: 0
		};
	}

	componentWillMount(){
		this.initializeScreen();
	}

	initializeScreen(){
		this.checkItemIsFlagged();
		this.getMetrics();
		this.getUserRating();
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

	getMetrics(){
		const { barcodeType, barcodeData } = this.results;
		let currBarcode = new Barcode(barcodeType, barcodeData);
		let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, currBarcode);
		let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateMetrics, 
			function(){}
		);
		this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
	}

	updateMetrics(resultsAndParams){
		let results = resultsAndParams.results.data();
		
		if(results.numStarRatings){
			this.setState({  
				numStarRatings : results.numStarRatings,
				sumRatings: results.sumRatings,
				numComments: results.numComments
			});
		}
	}

	getUserRating(){
		const { uuid } = this.results;
		let barcodeTypeRef = this.dbHandler.getRef("StarRatingsPerUser", {}, uuid);
		let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateUserRating, 
			function(){}
		);
		this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
	}

	updateUserRating(resultsAndParams){
		let results = resultsAndParams.results.data();
		this.setState({rating : results.rating });
	}

	static navigationOptions = ({ navigation }) => ({
		title: "Chocolate Details",
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
	
		this.setState({ 
			rating: rating,
			isDialogVisible: true
		});
	}

	render() {
		const { 
			barcodeData,
			barcodeType, 
			producerName, 
			confectionName,
			imageDownloadUrl, 
			uuid
		} = this.results;

		const currBarcode = new Barcode(barcodeType, barcodeData);
		
		return (
			<ScrollView>
				<View style={{flex: 1, flexWrap: 'wrap' }}>
					<Image 
						style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height/3}}
						source={{ uri : imageDownloadUrl }}
					/>

					<Header 
						producerName={producerName}
						confectionName={confectionName}
						sumRatings={this.state.sumRatings}
						numStarRatings={this.state.numStarRatings}
					/>

					<Description 
						text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque neque mi, cursus eget porta ut, auctor non risus. Nunc condimentum, mauris ac rhoncus hendrerit, mauris lectus fermentum tortor, eget mollis lectus ex in ligula. Aliquam vulputate, orci sed tincidunt faucibus, sapien nunc vehicula urna, in finibus tortor enim sed libero."}
					/>

					<UserRating 
						maxStars={this.maxStars}
						rating={this.state.rating}
						currBarcode={currBarcode}
						onStarRatingPress={this.onStarRatingPress}
						uuid={uuid}
						isDialogVisible={this.state.isDialogVisible}
						submitComment={this.submitComment}
						toggleDialogBox={this.toggleDialogBox}
					/>

					<CacaoStats 
						percentage={75}
						type={"Forastero"}
					/>

					<CountryOrigin 
						country={"MEXICO"} 
					/>

					<VendorAddress 
						address={"11 Seckel St. Apt. 2, Cambridge, Ma 02141"}
					/>

					<VendorWebsite 
						url={"https://www.facebook.com"}
						openWebpage={this.openWebpage}
					/>

					<TouchableOpacity style={{paddingLeft:15}} onPress={() => this.getComments()}>
						<Text style={{fontSize:14, paddingTop:5, paddingBottom:5, color:'rgba(0, 0, 0, .4)', textDecorationLine:'underline'}}>View comments ({this.state.numComments})</Text>
					</TouchableOpacity>

					{this.state.comments.length > 0 ? this.renderComments() : null}

				</View>
			</ScrollView>
		);
	}

	submitComment(inputText){
		if(inputText){
			const { barcodeType, barcodeData } = this.results;
			let commentUuid = uuidv4();
			let commentRef = this.dbHandler.getRef(
				"Comments", 
				barcode=null,
				barcodeUuid=this.results.uuid,
				commentUuid=commentUuid);
			
			const data = {
				comment: inputText,
				commentUuid: commentUuid,
				created_ts: new Date(),
				displayName: this.dbHandler.currUser.displayName,
				rating: this.state.rating,
				userid: this.dbHandler.currUser.uid
			}
			
			commentRef
				.set(data)
				.then( _ => {
					let currBarcode = new Barcode(barcodeType, barcodeData);
					this.dbHandler.incrementValue(
						StringConcatenations.Prefix, 
						"numComments", 
						1, 
						currBarcode);
				});
		}
	}

	toggleDialogBox(){ 
		this.setState({ isDialogVisible: !this.state.isDialogVisible }); 
	}

	async getComments(){
		let comments = []

		await firebase
			.firestore()
			.collection("Comments")
			.doc(this.results.uuid)
			.collection("ratings")
			.get()
			.then( snapshot => {
				snapshot.docs.forEach(doc =>{
					comments.push(doc.data());
				});
			});
	
		this.setState({ comments : comments });
	}

	renderComments(){
		return(
			<View>
				<FlatList
					data={this.state.comments}
					scrollEnabled={true}
					renderItem={({item, index}) => this.renderComment(item)}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}

	renderComment(item){
		return(
			<Comment 
				item={item}
			/>
		);
	}

	openWebpage(url){
		Linking
			.canOpenURL(url)
			.then(supported =>{
				if(supported){
					Linking.openURL(url);
				}
			});
	}
}