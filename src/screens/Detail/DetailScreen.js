import React, { Component } from 'react';
import { 
	Alert,
	Button,
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
import { Ionicons, Entypo } from '@expo/vector-icons';
import DbHandler from '../../helpers/DbHandler';
import Detail from './components/Detail';
import Barcode from '../../helpers/Barcode';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import StarRating from 'react-native-star-rating';
import Flag from 'react-native-flags';
import { 
	Colors, 
	StringConcatenations, 
	Warnings 
} from '../../helpers/Constants';
import DialogInput from 'react-native-dialog-input';
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
		const { navigation } = this.props;
		const { 
			barcodeData,
			barcodeType, 
			producerName, 
			confectionName,
			imageDownloadUrl, 
			uuid
		} = this.results;

		const shouldUserEditItem = navigation.getParam('shouldUserEditItem', false);
		const currBarcode = new Barcode(barcodeType, barcodeData);
		
		return (
			<ScrollView>
				<View style={{flex: 1, flexWrap: 'wrap' }}>
					<Image 
						style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height/3}}
						source={{ uri : imageDownloadUrl }}
					/>

					<View style={{
						flexDirection: "row",
						height: 100,
						backgroundColor:"white"
					}}>
						<View style={{
							width: Dimensions.get('window').width / 2,
							justifyContent:"center",
						}}>
							<Text style={{paddingLeft: 25, fontSize:18, fontWeight:'bold'}}> {producerName} </Text>
							<Text style={{paddingLeft: 25, fontSize:18}}> {confectionName} </Text>
						</View>

						<View style={{
							width: Dimensions.get('window').width / 2,
							justifyContent: 'center',
						}}>	
							<Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
								<Ionicons name="md-star" size={30} color="gold" />   
								{(this.state.sumRatings / this.state.numStarRatings) ? (this.state.sumRatings / this.state.numStarRatings).toFixed(1) : " "}
							</Text>

							<Text style={{fontSize:12, textAlign:"center", color:'rgba(0, 0, 0, .4)'}}>
								{this.state.numStarRatings} <Text style={{fontStyle:"italic", }}>ratings</Text>
							</Text>
						</View>
					</View>

					<View style={{ fontSize: 12, paddingLeft: 30, paddingRight: 25, paddingBottom:10}}>
						<Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque neque mi, cursus eget porta ut, auctor non risus. Nunc condimentum, mauris ac rhoncus hendrerit, mauris lectus fermentum tortor, eget mollis lectus ex in ligula. Aliquam vulputate, orci sed tincidunt faucibus, sapien nunc vehicula urna, in finibus tortor enim sed libero.
						</Text>
					</View>

					<View style={{padding:15, paddingLeft:110, paddingRight:110, borderBottomColor: Colors.Primary, borderBottomWidth: .5}}>
						<StarRating
							starSize={20}
							disabled={false}
							maxStars={this.maxStars}
							rating={this.state.rating}
							selectedStar={rating => this.onStarRatingPress(rating, currBarcode, uuid)}
							fullStarColor={"gold"}
						/>
						<Text style={{fontSize:12, paddingTop:5, color:'rgba(0, 0, 0, .4)', textAlign:'center'}}>Tap to rate</Text>
						<DialogInput 
							isDialogVisible={this.state.isDialogVisible}
							title={"What did you think about this chocolate?"}
							submitInput={ inputText => {
								this.submitComment(inputText); 
								this.toggleDialogBox(); 
							}}
							cancelText={"No thanks"}
							closeDialog={ () => {this.toggleDialogBox()}}>
						</DialogInput>
					</View>

					<View style={{
						flexDirection: "row",
						borderBottomColor: Colors.Primary, 
						borderBottomWidth: .5,
						height: 100,
						backgroundColor:"white",
					}}>
						<View style={{
							width: Dimensions.get('window').width / 2,
							
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<View >
								<Image 
									style={{height:40, width:40}}
									source={require('../../../assets/images/cacao_icon.png')}
								/>
							</View>
							<Text style={{fontSize:14}}> Cacao </Text>
						</View>

						<View style={{
							width: Dimensions.get('window').width / 2,
							justifyContent: 'center',
						}}>	
							<Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
								75%
							</Text>

							<Text style={{fontSize:14, textAlign:"center"}}>Forastero</Text>
						</View>
					</View>

					<View style={{
						flexDirection: "row",
						borderBottomColor: Colors.Primary, 
						borderBottomWidth: .5,
						height: 100,
						backgroundColor:"white",
					}}>
						<View style={{
							width: Dimensions.get('window').width / 2,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<Flag
								type="shiny"
								size={32}
								code="MX"
							/>
							
							<Text style={{textAlign:"center", fontSize:14, paddingLeft: 10, paddingRight: 10}}> Origin </Text>
						</View>

						<View style={{
							width: Dimensions.get('window').width / 2,
							justifyContent: 'center',
							alignItems: "center"
						}}>	
							<Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
								Mexico
							</Text>
						</View>
					</View>

					<View style={{
						flexDirection: "row",
						borderBottomColor: Colors.Primary, 
						borderBottomWidth: .5,
					}}>
						<View style={{
							width: Dimensions.get('window').width / 2,
							height: 100,
							backgroundColor:"white",
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<Entypo 
								size={40}
								name={"shop"}
							/>
							
							<Text style={{textAlign:"center", fontSize:14, paddingLeft: 10, paddingRight: 10}}> Vendor Address </Text>
						</View>

						<View style={{
							width: Dimensions.get('window').width / 2,
							height: 100,
							backgroundColor:"white",
							justifyContent: 'center',
							alignItems: "center"
						}}>	
							<Text style={{fontSize:14, textAlign:"center"}}>11 Seckel St. Apt. 2, Cambridge, Ma 02141</Text>
						</View>
					</View>

					<View style={{
						flexDirection: "row"
					}}>
						<View style={{
							width: Dimensions.get('window').width / 2,
							height: 100,
							backgroundColor:"white",
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<Ionicons
								size={40}
								name={"md-link"}
							/>
							
							<Text style={{textAlign:"center", fontSize:14, paddingLeft: 10, paddingRight: 10}}> Vendor Website </Text>
						</View>

						<View style={{
							width: Dimensions.get('window').width / 2,
							height: 100,
							backgroundColor:"white",
							justifyContent: 'center',
							alignItems: "center"
						}}>	
							<TouchableOpacity onPress={() => this.openWebPage("https://www.facebook.com")}>
								<Text style={{fontSize:14, textAlign:"center", color: Colors.Primary, fontWeight:"bold"}}>www.facebook.com</Text>
							</TouchableOpacity>
						</View>
					</View>

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

	openWebPage(url){
		Linking
			.canOpenURL(url)
			.then(supported =>{
				if(supported){
					Linking.openURL(url);
				}
			});
	}
}