import React, { Component } from 'react';
import { 
	View, 
	TouchableOpacity, 
	Button
} from 'react-native';
import './components/Detail';
import * as firebase from 'firebase';
import styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import DbHandler from '../../helpers/DbHandler';
import Detail from './components/Detail';
import Barcode from '../../helpers/Barcode';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { StringConcatenations } from '../../helpers/Constants';

export default class DetailScreen extends Component {
	constructor(props) {
    super(props);
		this.dbHandler = new DbHandler();
		this.results = this.props.navigation.getParam('results', 'none');
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

	deleteItem(){
		const { barcodeType, barcodeData } = this.results;
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
		const shouldUserEditItem = navigation.getParam('shouldUserEditItem', 'none');

		return (
			<View style={styles.container}>
				<Detail title={this.results.confectionName} />
				<Detail title={this.results.brand} />
				<Detail title={this.results.type} />
				
				{ shouldUserEditItem ? 
					<View>
						<Button 
							title="Delete"
							onPress={() => this.deleteItem() } 
							styles={styles.button}
						/> 
						
						<Button 
							title="Edit Chocolate"
							onPress={() => { console.log("Edit Chocolate"); } } 
							styles={styles.button}
						/> 
					</View> 
				: null }
			</View>
		);
	}
}