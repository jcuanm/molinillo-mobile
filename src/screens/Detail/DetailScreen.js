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
import { StringConcatenations, Warnings } from '../../helpers/Constants';

export default class DetailScreen extends Component {
	constructor(props) {
    	super(props);
		this.dbHandler = new DbHandler();
		this.entries = this.props.navigation.getParam('results', {});
		this.navigateOnSuccessfulDelete = this.navigateOnSuccessfulDelete.bind(this); 
		this.updateIsFlagged = this.updateIsFlagged.bind(this); 
		this.state = {}
	}

	componentWillMount(){
		this.checkItemIsFlagged();
	}

	checkItemIsFlagged(){
		const { barcodeType, barcodeData } = this.entries;
		let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, new Barcode(barcodeType, barcodeData));
		let checkItemIsFlaggedCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateIsFlagged, 
			function(){}
		);
		this.dbHandler.getData(barcodeTypeRef, checkItemIsFlaggedCallbacksAndParams);
	}

	updateIsFlagged(resultsAndParams){
		let isFlagged = resultsAndParams.results.data().numFlags > 0;
		this.setState({ isFlagged : isFlagged })
	}

	static navigationOptions = ({ navigation }) => ({
		title: "Chocolate Details",
		headerLeft: (
			<TouchableOpacity style={styles.headerButton}>
				<Ionicons name="md-arrow-back" size={32} onPress={() => navigation.popToTop()} size={35} color="black" />
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
		const { barcodeType, barcodeData } = this.entries;
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

	flagItem(curr_barcode){
		const fieldName = "numFlags";
		
		if(this.state.isFlagged){
			const decrementAmount = -1;
			this.dbHandler.incrementValue(
				StringConcatenations.Prefix, 
				fieldName, 
				decrementAmount, 
				curr_barcode);
			this.setState({ isFlagged : false });
		}
		else{
			const incrementAmount = 1;
			this.dbHandler.setData('FlagsPerUser', { [curr_barcode.data] : curr_barcode.type });
			this.dbHandler.incrementValue(
				StringConcatenations.Prefix, 
				fieldName, 
				incrementAmount, 
				curr_barcode);
			this.setState({ isFlagged : true });
		}
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
		} = this.entries;

		const shouldUserEditItem = navigation.getParam('shouldUserEditItem', false);
		const curr_barcode = new Barcode(barcodeType, barcodeData)
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
					onPress={() => this.flagItem(curr_barcode) }
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
								{ barcode: curr_barcode, entries: this.entries })} 
							styles={styles.button}
						/>
					</View> 
				: null }
			</View>
		);
	}
}