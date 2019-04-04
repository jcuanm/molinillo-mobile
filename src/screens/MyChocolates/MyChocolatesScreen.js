import React, { Component } from 'react';
import { 
    FlatList,
    Text, 
    TouchableOpacity,
    View
 } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import { StringConcatenations } from '../../helpers/Constants';
import { ListItem, SearchBar } from 'react-native-elements';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.barcodeTypeResultsSuccessCallback = this.barcodeTypeResultsSuccessCallback.bind(this); 
        this.state = {
            myChocolates: []
        }
    }

    componentDidMount() {
        let myChocolatesRef = this.dbHandler.getRef("MyChocolates");
        let myChocolatesResults = this.dbHandler.getData(
            myChocolatesRef, 
            this.myChocolatesResultsSuccessCallback, 
            [], 
            this.myChocolatesResultsErrorCallback, 
            []);

        myChocolatesResults.then(results => {
            let newMyChocolates = []; 
            for (let barcodeData in results.data()){
                let barcodeType = results.data()[barcodeData];

                let barcodeTypeRef = this.dbHandler.getRef(
                    StringConcatenations.Prefix, 
                    barcodeType, 
                    barcodeData);

                let barcodeTypeResults = this.dbHandler.getData(
                    barcodeTypeRef,
                    this.barcodeTypeResultsSuccessCallback,
                    [newMyChocolates],
                    this.barcodeTypeResultsErrorCallback,
                    []);
            }
        })
        .catch(error => {
            console.log("Empty");
        })
    }

    barcodeTypeResultsSuccessCallback(results, optionalParams){
        let newMyChocolates = optionalParams[0];
        newMyChocolates.push({key : results.data()})
        this.setState( { myChocolates: newMyChocolates } );
    }

    barcodeTypeResultsErrorCallback(error, optionalParams){
        console.log("Error " + error);
    }

    myChocolatesResultsSuccessCallback(results, optionalParams){
        if (results.exists) { return results; }
    }

    myChocolatesResultsErrorCallback(error, optionalParams){
        console.log('Error getting myChocolates document', error);
    }

    static navigationOptions = ({ navigation }) => ({
        title: "My Chocolates",
    })

    renderItem(item, index){
        return(
            <TouchableOpacity 
                onPress={ () => this.props.navigation.navigate(
                    "DetailScreen",
                    { results : this.state.myChocolates[index].key})}
            >
                <ListItem
                    roundAvatar
                    title={<Text>{item.key.confectionName}</Text>}
                    subtitle={<Text>{index.toString()}</Text>}
                />
            </TouchableOpacity>
        )
    }

    render() {
        if(this.state.myChocolates.length){
            return (
                <View>
                    <SearchBar
                        onChangeText={() => console.log("Typeing...")}
                        onClear={() => console.log("Cleared...")}
                        placeholder='Type Here...' 
                        clearIcon={{name: 'clear'}}
                    />
    
                    <FlatList
                        data={this.state.myChocolates}
                        renderItem={({item, index}) => this.renderItem(item, index)}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </View>
            ); 
        }
        else {
            return <Text>Loading...</Text>
        }
        
    }
}