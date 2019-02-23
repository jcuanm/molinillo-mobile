import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Warnings, Collections } from '../../helpers/Constants';
import DbHandler from '../../helpers/DbHandler';

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.dbHandler = new DbHandler();
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
    let confectionsRef = this.dbHandler.getRef(Collections['confections'], type, data);
    confectionsRef.get()
      .then(results => {
        if (!results.data()){
          this.handleBarcodeNotFound(type, data);
        } 
        else {
          this.handleBarcodeFound(results.data(), type, data);
        }
      })
      .catch(error => {
        console.log("error: " + error);
        alert("Error getting chocolate: " + error);
      });
  }

  handleBarcodeFound(results, barcodeType, barcodeData){
    let myChocolatesRef = this.dbHandler.getRef(Collections['myChocolates'], barcodeType, barcodeData);
    myChocolatesRef.set(results);
    myChocolatesRef.get()
      .then( _ => {
        this.props.navigation.navigate("DetailScreen", { results: results })
      })
      .catch(error => {
        console.log("error: " + error);
        alert("Error getting chocolate: " + error);
      })
  }

  handleBarcodeNotFound(barcodeType, barcodeData){
    Alert.alert(
      Warnings['failedToFindChocolate'],
      Warnings['helpFindChocolate'],
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