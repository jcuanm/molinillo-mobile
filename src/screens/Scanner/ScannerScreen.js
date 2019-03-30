import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert
} from 'react-native';
import { BarcodeTypeMappings, StringConcatenations, Warnings } from '../../helpers/Constants';
import { BarCodeScanner, Permissions } from 'expo';
import DbHandler from '../../helpers/DbHandler';

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.dbHandler = new DbHandler();
    this.handleMyChocolatesSuccessCallback = this.handleMyChocolatesSuccessCallback.bind(this); 
    this.handleMyChocolatesErrorCallback = this.handleMyChocolatesErrorCallback.bind(this); 
    this.handleBarcodeSuccessCallback = this.handleBarcodeSuccessCallback.bind(this); 
    this.handleBarcodeErrorCallback = this.handleBarcodeErrorCallback.bind(this); 
    this.handleBarcodeFound = this.handleBarcodeFound.bind(this); 
    this.handleBarcodeNotFound = this.handleBarcodeNotFound.bind(this); 
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
  }

  state = {
    hasCameraPermission: null,
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Scanner",
  })

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned({ type, data }) {
    type = BarcodeTypeMappings[type];
    let barcodeTypeRef = this.dbHandler.getRef(
      StringConcatenations.Prefix, 
      type, 
      data);
    
    let barcodeTypeResults = this.dbHandler.getData(
      barcodeTypeRef,
      this.handleBarcodeSuccessCallback,
      [type, data],
      this.handleBarcodeErrorCallback,
      []);
  }

  handleBarcodeSuccessCallback(results, optionalParams){
    let type = optionalParams[0];
    let data = optionalParams[1];
    if (!results.exists){
      this.handleBarcodeNotFound(type, data);
    } 
    else {
      this.handleBarcodeFound(results.data(), type, data);
    }
  }

  handleBarcodeErrorCallback(error, optionalParams){
    console.log("error: " + error);
    alert("Error getting chocolate: " + error);
  }

  handleBarcodeFound(results, barcodeType, barcodeData){
    let myChocolatesRef = this.dbHandler.getRef("MyChocolates", barcodeType, barcodeData);
    myChocolatesRef.set(results);
    let myChocolatesResults = this.dbHandler.getData(
      myChocolatesRef,
      this.handleMyChocolatesSuccessCallback,
      [],
      this.handleMyChocolatesErrorCallback,
      []);
  }

  handleMyChocolatesSuccessCallback(results, optionalParams){
    this.props.navigation.navigate("DetailScreen", { results: results.data() })
  }

  handleMyChocolatesErrorCallback(error, optionalParams){
    console.log("error: " + error);
    alert("Error getting chocolate: " + error);  
  }

  handleBarcodeNotFound(barcodeType, barcodeData){
    Alert.alert(
      Warnings.FailedToFindChocolate,
      Warnings.HelpFindChocolate,
      [
        {text: 'No thanks', style: 'cancel'},
        {text: 'Add Chocolate', onPress: () => 
          this.props.navigation.navigate(
            "AddChocolateScreen",
            { 
              barcodeType: barcodeType, 
              barcodeData: barcodeData, 
            }
          )
        },
      ],
      { cancelable: false }
    );
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
          onBarCodeScanned={this.handleBarCodeScanned}
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