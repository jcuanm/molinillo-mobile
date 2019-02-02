import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Alert
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import * as firebase from 'firebase';

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.currUser = firebase.auth().currentUser;
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
    this.addToMyChocolates = this.addToMyChocolates.bind(this);
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

  handleBarCodeScanned({ type, data }) {
    var confectionsQuery = this.db.collection("confections")
      .doc(type.toString())
      .collection("barcodeData")
      .doc(data.toString());
    this.process(confectionsQuery, type, data);
  }

  addToMyChocolates(barcodeType, barcodeData, results){
    let myChocolatesRef = this.db.collection("myChocolates")
      .doc(this.currUser.uid)
      .collection(barcodeType.toString())
      .doc(barcodeData.toString())
      
    return this.db.runTransaction(transaction => {
      return transaction.get(myChocolatesRef)
          .then(res => {
              if (!res.exists){
                  console.log("Document does not exist!");
              }
              console.log("Results", results);
              transaction.set(myChocolatesRef, results);
          }) 
    })
  }

  process(query, type, data){
    query.get()
      .then(results => {
        if (results.data() == null){
          Alert.alert(
            'Sorry, we couldn\'t find this chocolate',
            'Help us out by adding this new chocolate to our database!',
            [
              {text: 'No thanks', style: 'cancel'},
              {text: 'Add Chocolate', onPress: () => 
                this.props.navigation.navigate("AddChocolateScreen",{ barcodeType: type, barcodeData: data , addToMyChocolates: this.addToMyChocolates})
              },
            ],
            { cancelable: false }
          )
        } 
        else {
          this.addToMyChocolates(type, data, results.data());
        }
      })
      .catch(function(error) {
        console.log("error: " + error);
        alert("Error getting chocolate: " + error);
      });
  }
}