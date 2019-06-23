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
import * as firebase from 'firebase';
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
	}

	static navigationOptions = ({ navigation }) => ({
		title: "Chocolate Details",
		headerLeft: (
			<TouchableOpacity style={styles.headerButton}>
				<Ionicons name="md-arrow-back" size={32} onPress={() => navigation.popToTop()} size={35} color="black" />
			</TouchableOpacity>
		),		
	})

	promptDeleteItemPrompt(){
		Alert.alert(
			Warnings.ConfirmDeletion,
			"",
      [
			{text: 'Delete', onPress: () => 
				this.deleteItem()
        },
        {text: 'Cancel', style: 'cancel'}
      ],
      { cancelable: false }
    );
	}

	deleteItem(){
		const { barcodeType, barcodeData } = this.entries;
		let barcodeToDelete = new Barcode(barcodeType, barcodeData);
		let detailRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcodeToDelete);

		let deleteItemCallbackAndParams = new CallbacksAndParams(
			{}, 
			this.navigateOnSuccessfulDelete, 
			function(){}
		);

		this.dbHandler.deleteItem(detailRef, deleteItemCallbackAndParams);

		let dbRef = this.dbHandler.getRef('MyChocolates');
		this.deleteFieldFromDocument(dbRef, barcodeToDelete);
	}

	deleteFieldFromDocument(dbRef, barcodeToDelete){
		try{
			dbRef.update({
				[barcodeToDelete.data] : firebase.firestore.FieldValue.delete()
			});
		}
		catch{
			console.log("Could not delete field in document from myChocolates collection: ", barcodeToDelete);
		}
	}

	navigateOnSuccessfulDelete(){
		this.props.navigation.popToTop();
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
				
				{ shouldUserEditItem ? 
					<View>
						<Button 
							title="Delete"
							onPress={() => this.promptDeleteItemPrompt() } 
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