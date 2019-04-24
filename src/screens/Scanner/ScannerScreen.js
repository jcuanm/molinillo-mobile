import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert
} from 'react-native';
import { StringConcatenations, Warnings } from '../../helpers/Constants';
import { BarCodeScanner, Permissions } from 'expo';
import DbHandler from '../../helpers/DbHandler';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import Barcode from '../../helpers/Barcode';

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.dbHandler = new DbHandler();
    this.state = {
      currBarcodeData: null,
      hasCameraPermission: null,
    }

    this.handleBarcodeScanned = this.handleBarcodeScanned.bind(this);
    this.handleBarcodeFound = this.handleBarcodeFound.bind(this); 
    this.handleBarcodeNotFound = this.handleBarcodeNotFound.bind(this); 
    this.navigateUserAndResultsToDetailScreen = this.navigateUserAndResultsToDetailScreen.bind(this); 
    this.alertErrorRetrievingData = this.alertErrorRetrievingData.bind(this); 
    this.delay = this.delay.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Scanner",
  })

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarcodeScanned = async expoBarcode => {
    let delayTimeinMilliseconds = 500;
    await this.delay(delayTimeinMilliseconds);
    if (this.state.currBarcodeData == expoBarcode.data) return;
    this.setState({ currBarcodeData: expoBarcode.data });

    let barcode = new Barcode(expoBarcode.type, expoBarcode.data);
    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
    let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
      barcode,
      this.handleBarcodeFound,
      this.handleBarcodeNotFound);
    let barcodeTypeResults = this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);  
  }

  handleBarcodeFound(resultsAndParams){
    let barcode = resultsAndParams.params;
    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
    let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
      barcode,
      this.navigateUserAndResultsToDetailScreen,
      this.alertErrorRetrievingData);
    let barcodeTypeResults = this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
  }

  navigateUserAndResultsToDetailScreen(resultsAndParams){
    let results = resultsAndParams.results;
    this.props.navigation.navigate("DetailScreen", { results: results.data() });
  }

  alertErrorRetrievingData(resultsAndParams){
    let barcode = resultsAndParams.params;
    alert("Error getting chocolate " + barcode.data.toString() + " of type " + barcode.type);  
  }

  handleBarcodeNotFound(resultsAndParams){
    let barcode = resultsAndParams.params;
    Alert.alert(
      Warnings.FailedToFindChocolate,
      Warnings.HelpFindChocolate,
      [
        {text: 'No thanks', style: 'cancel'},
        {text: 'Add Chocolate', onPress: () => 
          this.props.navigation.navigate(
            "AddChocolateScreen",
            { barcode : barcode })
        },
      ],
      { cancelable: false }
    );
  }

  delay(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve(), time);
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarcodeScanned}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.upc_a,
            BarCodeScanner.Constants.BarCodeType.upc_e,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.code39,
            BarCodeScanner.Constants.BarCodeType.code128,
            BarCodeScanner.Constants.BarCodeType.interleaved2of5,
            BarCodeScanner.Constants.BarCodeType.itf14,
            BarCodeScanner.Constants.BarCodeType.codabar,
            BarCodeScanner.Constants.BarCodeType.code93,
          ]}
          navigationFunc={this.props.navigation.navigate}
          type={this.state.type}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </View>
    );
  }
}