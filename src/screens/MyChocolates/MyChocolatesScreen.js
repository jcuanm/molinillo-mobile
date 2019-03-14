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
        let myChocolatesResults = myChocolatesRef.get()
            .then(results => {
                if (results.exists) {
                    return results;
                }
            })
            .catch(err => {
                console.log('Error getting myChocolates document', err);
            });
        
        myChocolatesResults.then(results => {
            let newMyChocolates = []; 
            for (let barcodeData in results.data()){
                let barcodeType = results.data()[barcodeData];
                let barcodeTypeRef = this.dbHandler.getRef(
                    StringConcatenations.Prefix, 
                    barcodeType, 
                    barcodeData);
                barcodeTypeRef.get()
                    .then(barcodeTypeResults => {
                        newMyChocolates.push({key : JSON.stringify(barcodeTypeResults.data())})
                        this.setState( { myChocolates: newMyChocolates } );
                    })
                    .catch(err => {
                        console.log("Error " + err);
                    })
            }
        })
    }

    static navigationOptions = ({ navigation }) => ({
        title: "My Chocolates",
    })
    
    render() {
        if (this.state.myChocolates.length){
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
        else {
            return <Text>Loading...</Text>
        }
        
    }
}