import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert
} from 'react-native';
import { StringConcatenations, Warnings } from '../../helpers/Constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DbHandler from '../../helpers/DbHandler';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import Barcode from '../../helpers/Barcode';
import { Colors } from '../../helpers/Constants';
import { ScannerScreenStyles } from './styles';

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.dbHandler = new DbHandler();
    this.state = {
      currBarcodeData: null,
      handleBarcodeScanned: this.handleBarcodeScanned, 
      hasCameraPermission: null,
    }

    this.handleBarcodeScanned = this.handleBarcodeScanned.bind(this);
    this.handleBarcodeFound = this.handleBarcodeFound.bind(this); 
    this.handleBarcodeNotFound = this.handleBarcodeNotFound.bind(this); 
    this.alertErrorRetrievingData = this.alertErrorRetrievingData.bind(this); 
  }

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: Colors.Secondary,
    headerStyle: {
      backgroundColor: Colors.Primary,
    },
    headerTitleStyle: {
      color: Colors.Secondary
    },
    title: "Scanner",
  })

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarcodeScanned = async expoBarcode => {
    let barcode = new Barcode(expoBarcode.type, expoBarcode.data);
    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, barcode);
    let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
      barcode,
      this.handleBarcodeFound,
      this.handleBarcodeNotFound);
    let barcodeTypeResults = this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);  
    this.setState({ handleBarcodeScanned: undefined });
  }

  handleBarcodeFound(resultsAndParams){
    let currBarcode = resultsAndParams.params;
    let results = resultsAndParams.results;

    // Update the scan meta data 
    let scansRef = this.dbHandler.getRef("Scans");
    scansRef.set({
      created_ts: new Date(),
      userId: this.dbHandler.currUser.uid,
      barcodeData: currBarcode.data,
      barcodeType: currBarcode.type
    },{ merge : true });

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
        {text: 'No thanks', style: 'cancel', onPress: () => this.setState({ handleBarcodeScanned: this.handleBarcodeScanned })},
        {text: 'Add Chocolate', onPress: () => 
          this.props.navigation.navigate("AddChocolateScreen", { barcode : barcode })
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text style={ScannerScreenStyles.permissionText}>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text style={ScannerScreenStyles.permissionText}>No access to camera</Text>;
    }
    return (
      <View style={ScannerScreenStyles.container} >
        <BarCodeScanner
          onBarCodeScanned={this.state.handleBarcodeScanned}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.upc_a,
            BarCodeScanner.Constants.BarCodeType.upc_e,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.code39,
            BarCodeScanner.Constants.BarCodeType.code128,
            BarCodeScanner.Constants.BarCodeType.itf14,
            BarCodeScanner.Constants.BarCodeType.codabar,
            BarCodeScanner.Constants.BarCodeType.code93,
          ]}
          navigationFunc={this.props.navigation.navigate}
          type={this.state.type}
          style={StyleSheet.absoluteFill}
        />

        {/* Camera Overlay */}
        <View style={ScannerScreenStyles.overlayTop} />
        <View style={ScannerScreenStyles.overlayCenter}>
          <View style={ScannerScreenStyles.overlayLeft} />
          <View style={ScannerScreenStyles.overlayFocused} />
          <View style={ScannerScreenStyles.overlayRight} />
        </View>
        <View style={ScannerScreenStyles.overlayBottom} >
          <Text style={ScannerScreenStyles.overlayText}> Scan the chocolate's barcode </Text>
        </View>
      </View>
    );
  }
}
