import React, { Component } from 'react';
import { 
    View, 
    Text, 
    FlatList
 } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import styles from '../../styles';
import { StringConcatenations } from '../../helpers/Constants';
import { SearchBar } from 'react-native-elements';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.state = {
            myChocolates: []
        }
    }

    componentDidMount() {
        let myChocolatesRef = this.dbHandler.getRef("MyChocolates");
        myChocolatesRef.get()
            .then(myChocolatesResults => {
                if (myChocolatesResults.exists) {
                    let newMyChocolates = []; 
                    for (let barcodeData in myChocolatesResults.data()){
                        let barcodeType = myChocolatesResults.data()[barcodeData];
                        let barcodeTypeRef = this.dbHandler.getRef(
                            StringConcatenations.Prefix, 
                            barcodeType, 
                            barcodeData);
                        barcodeTypeRef.get()
                            .then(barcodeTypeResults => {
                                newMyChocolates.push({key : JSON.stringify(barcodeTypeResults.data())})
                            })
                            .catch(err => {
                                console.log("Error " + err);
                            })
                    }
                    this.setState( { myChocolates: newMyChocolates } );
                }
            })
            .catch(err => {
                console.log('Error getting myChocolates document', err);
            });
    }

    static navigationOptions = ({ navigation }) => ({
        title: "My Chocolates",
    })
    
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    onChangeText={() => console.log("Typeing...")}
                    onClear={() => console.log("Cleared...")}
                    placeholder='Type Here...' 
                    clearIcon={{name: 'clear'}}
                />

                <FlatList
                    data={this.state.myChocolates}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        );
    }
}