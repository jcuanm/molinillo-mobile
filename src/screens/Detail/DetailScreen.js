import React, { Component } from 'react';
import { 
	FlatList,
	Image,
	Linking,
	ScrollView,
	Text,
	TouchableOpacity, 
	View, 
} from 'react-native';
import { DetailScreenStyles } from './styles'
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from '../../helpers/DbHandler';
import Header from './components/Header';
import Description from './components/Description';
import UserRating from './components/UserRating';
import CacaoStats from './components/CacaoStats';
import CountryOrigin from './components/CountryOrigin';
import VendorAddress from './components/VendorAddress';
import ChocolateName from './components/ChocolateName';
import Commerce from './components/Commerce';
import Barcode from '../../helpers/Barcode';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { Colors, StringConcatenations } from '../../helpers/Constants';
import Comment from './components/Comment';
const uuidv4 = require('uuid/v4');


export default class DetailScreen extends Component {
	constructor(props) {
    	super(props);
		this.dbHandler = new DbHandler();
		this.maxStars = 5;
		this.results = this.props.navigation.getParam('results', {});
		this.updateMetrics = this.updateMetrics.bind(this); 
		this.updateUserRating = this.updateUserRating.bind(this); 
		this.onStarRatingPress = this.onStarRatingPress.bind(this); 
		this.submitComment = this.submitComment.bind(this); 
		this.toggleDialogBox = this.toggleDialogBox.bind(this); 
		this.openWebpage = this.openWebpage.bind(this); 

		this.state = {
			isDialogVisible: false,
			sumRatings: 0,
			numStarRatings : 0,
			rating: 0,
			comments: [],
			numComments: 0
		};
	}

	componentDidMount(){
		this.initializeScreen();
	}

	initializeScreen(){
		this.getMetrics();
		this.getUserRating();
	}

	getMetrics(){
		const { barcodeType, barcodeData, uuid } = this.results;
		let currBarcode = new Barcode(barcodeType, barcodeData);
		let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, currBarcode, uuid);
		let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateMetrics, 
			function(){}
		);
		this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
	}

	updateMetrics(resultsAndParams){
		let results = resultsAndParams.results.data();
		let data = {};

		if(results.numStarRatings){
			data["numStarRatings"] = results.numStarRatings;
		}
		if(results.sumRatings){
			data["sumRatings"] = results.sumRatings;
		}
		if(results.numComments){
			data["numComments"] = results.numComments;
		}

		if(Object.entries(data).length > 0){
			this.setState(data);
		}
	}

	getUserRating(){
		const { uuid } = this.results;
		let starRatingsPerUserRef = this.dbHandler.getRef("StarRatingsPerUser", {}, uuid);
		let starRatingsPerUserCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateUserRating, 
			function(){}
		);
		this.dbHandler.getData(starRatingsPerUserRef, starRatingsPerUserCallbacksAndParams);
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
			color: Colors.Secondary
		},
		headerLeft: (
			<TouchableOpacity onPress={() => navigation.popToTop()} style={DetailScreenStyles.headerButton}>
				<Ionicons 
					name="md-arrow-back" 
					size={25} 
					color={Colors.Secondary} 
				/>
			</TouchableOpacity>
		),		
	})

	onStarRatingPress(rating, currBarcode, uuid){
		const data = {
			lastUpdated: new Date(),
			chocolateUuid: uuid,
			barcodeData: currBarcode.data,
			barcodeType: currBarcode.type,
			rating: rating,
			userId: this.dbHandler.currUser.uid
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
			cacaoPercentage,
			cacaoVariety,
			confectionDescription,
			countryOfOrigin,
			producerName, 
			confectionName,
			imageDownloadUrl, 
			vendorAddress,
			vendorUid,
			vendorUrl,
			uuid,
			price,
			vendorEmail
		} = this.results;

		const {
			isDialogVisible,
			numStarRatings,
			rating,
			comments,
			numComments,
			sumRatings
		} = this.state;

		const currBarcode = new Barcode(barcodeType, barcodeData);
		
		return(
			<ScrollView keyboardShouldPersistTaps={'handled'}>
				<View style={DetailScreenStyles.container}>
					<Image 
						style={DetailScreenStyles.image}
						source={{ uri : imageDownloadUrl }}
					/>

					{
						price > 0 ?
							<Commerce 
								barcodeData={barcodeData}
								barcodeType={barcodeType}
								uuid={uuid}
								producerName={producerName}
								price={price}
								confectionName={confectionName}
								imageDownloadUrl={imageDownloadUrl}
								vendorAddress={vendorAddress}
								vendorUid={vendorUid}
								vendorEmail={vendorEmail}
							/>
						:
							null
					}
					
					<Header 
						sumRatings={sumRatings}
						numStarRatings={numStarRatings}
						barcodeData={barcodeData}
						barcodeType={barcodeType}
						uuid={uuid}
					/>

					<ChocolateName
						producerName={producerName}
						confectionName={confectionName}
					/>

					{
						confectionDescription ? 
							<Description text={confectionDescription} /> 
						: 
							null
					}
					
					<UserRating 
						maxStars={this.maxStars}
						rating={rating}
						currBarcode={currBarcode}
						onStarRatingPress={this.onStarRatingPress}
						uuid={uuid}
						isDialogVisible={isDialogVisible}
						submitComment={this.submitComment}
						toggleDialogBox={this.toggleDialogBox}
					/>

					<CacaoStats 
						percentage={cacaoPercentage}
						type={cacaoVariety}
					/>

					<CountryOrigin 
						country={countryOfOrigin} 
					/>

					<VendorAddress 
						address={vendorAddress}
					/>

					<TouchableOpacity style={DetailScreenStyles.viewCommentsButtonContainer} onPress={() => this.getComments()}>
						<Text style={DetailScreenStyles.viewCommentsButtonText} >
							View comments ({numComments})
						</Text>
					</TouchableOpacity>

					{comments.length > 0 ? this.renderComments() : null}

				</View>
			</ScrollView>
		);
	}

	submitComment(inputText){
		if(inputText){
			const { barcodeType, barcodeData, uuid } = this.results;
			let commentUuid = uuidv4();
			let commentRef = this.dbHandler.getRef(
				"Comments", 
				barcode=null,
				barcodeUuid=uuid,
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
					let currBarcode = new Barcode(barcodeType, barcodeData, uuid);
					this.dbHandler.incrementValue(
						StringConcatenations.Prefix, 
						"numComments", 
						1, 
						currBarcode,
						uuid);

					this.setState({numComments : this.state.numComments + 1});
				})
				.catch(error => {
					alert("Unable to submit comment");
					console.log(error);
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
		
		// Sort comments in descending order based on time uploaded
		comments.sort(function(a,b){return b.created_ts.seconds - a.created_ts.seconds});

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
		if(url){
			Linking
				.canOpenURL(url)
				.then(supported =>{
					if(supported){
						Linking.openURL(url);
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}
