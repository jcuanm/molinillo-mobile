import React, { Component } from 'react';
import { 
    FlatList,
    Text, 
    TouchableOpacity,
    View
 } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { StringConcatenations } from '../../helpers/Constants';
import { ListItem, SearchBar } from 'react-native-elements';
import Barcode from '../../helpers/Barcode';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.addToMyChocolatesList = this.addToMyChocolatesList.bind(this); 
        this.state = {
            isLoading: false,
            myChocolates: []
        }
    }

    componentWillMount(){
        let myChocolatesRef = this.dbHandler.getRef("MyChocolates");
        let myChocolatesCallbacksAndParams = new CallbacksAndParams(
            null, 
            function(resultsAndParams){ return resultsAndParams.results; },
            function(_){ console.log('Error getting myChocolates document'); });
        let myChocolatesResults = this.dbHandler.getData(myChocolatesRef, myChocolatesCallbacksAndParams);

        this.setState({ isLoading: true});

        myChocolatesResults.then(results => {
            let newMyChocolates = []; 
            for (let barcodeData in results.data()){
                let barcodeType = results.data()[barcodeData];
                let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, new Barcode(barcodeType, barcodeData));
                let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
                    newMyChocolates,
                    this.addToMyChocolatesList,
                    function(_){ console.log('Error getting myChocolates document'); });
                let barcodeTypeResults = this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
            }

            this.setState({ isLoading: false})
        })
        .catch(error => {
            console.log("Empty", error);
            alert("Sorry! We're having trouble connecting.")
        })
    }

    addToMyChocolatesList(resultsAndParams){
        let newMyChocolates = resultsAndParams.params;
        newMyChocolates.push({key : resultsAndParams.results.data()})
        this.setState( { myChocolates: newMyChocolates } );
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
        if(this.state.isLoading){
            return <Text>Loading...</Text>
        }
        else {
            return(
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
    }
}