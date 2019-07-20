import React, { Component } from 'react';
import { 
	Alert,
	Button,
	Dimensions,
	Image,
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
import { 
	Colors, 
	StringConcatenations, 
	Warnings } 
from '../../helpers/Constants';

export default class DetailScreen extends Component {
	constructor(props) {
    	super(props);
		this.dbHandler = new DbHandler();
		this.results = this.props.navigation.getParam('results', {});
		this.navigateOnSuccessfulDelete = this.navigateOnSuccessfulDelete.bind(this); 
		this.updateIsFlagged = this.updateIsFlagged.bind(this); 
		this.state = {};
	}

	componentWillMount(){
		this.checkItemIsFlagged();
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
		
		this.setState({ isFlagged : isFlagged })
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

	render() {
		const { navigation } = this.props;
		const { 
			barcodeData,
			barcodeType, 
			brand, 
			confectionName,
			imageDownloadUrl, 
			type,
		} = this.results;

		const shouldUserEditItem = navigation.getParam('shouldUserEditItem', false);
		const currBarcode = new Barcode(barcodeType, barcodeData)
		return (
			<View style={styles.container}>
				<Image 
                    style={{width: Dimensions.get('window').width, height: 200}}
                    source={{ uri : imageDownloadUrl }}
                />

				<Detail title={confectionName} />
				<Detail title={brand} />
				<Detail title={type} />
				<Ionicons 
					name="md-flag" 
					size={32} 
					color={this.state.isFlagged ? "red" : "grey"} 
					onPress={() => this.promptFlagItem(currBarcode) }
				/>

				{ shouldUserEditItem ? 
					<View>
						<Button 
							title="Delete"
							onPress={() => this.promptDeleteItem() } 
							styles={styles.button}
						/> 
						
						<Button 
							title="Edit Chocolate"
							onPress={() => navigation.navigate(
								"EditChocolateScreen", 
								{ barcode: currBarcode, entries: this.results })} 
							styles={styles.button}
						/>
					</View> 
				: null }
			</View>
		);
	}
}