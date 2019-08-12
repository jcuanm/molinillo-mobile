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
import ChocolateName from './components/ChocolateName';
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

	componentWillMount(){
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
			color: 'white'
		},
		headerLeft: (
			<TouchableOpacity style={styles.headerButton}>
				<Ionicons name="md-arrow-back" size={25} onPress={() => navigation.popToTop()} color="white" />
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
			vendorUrl,
			uuid
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
		
		return (
			<ScrollView>
				<View style={{flex: 1, flexWrap: 'wrap' }}>
					<Image 
						style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height/3}}
						source={{ uri : imageDownloadUrl }}
					/>

					<Header 
						sumRatings={sumRatings}
						numStarRatings={numStarRatings}
						uuid={uuid}
					/>

					<ChocolateName
						producerName={producerName}
						confectionName={confectionName}
					/>

					{
						confectionDescription ? 
							<Description 
								text={confectionDescription}
							/> 
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

					<VendorWebsite 
						url={vendorUrl}
						openWebpage={this.openWebpage}
					/>

					<TouchableOpacity style={{paddingLeft:15}} onPress={() => this.getComments()}>
						<Text style={{
							fontSize:14, 
							paddingTop:5, 
							paddingBottom:5, 
							color:'rgba(0, 0, 0, .4)', 
							textDecorationLine:'underline'}}
						>
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