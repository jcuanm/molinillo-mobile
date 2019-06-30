import React, { Component } from 'react';
import { 
    FlatList,
    Text, 
    View
 } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { StringConcatenations } from '../../helpers/Constants';
import { SearchBar } from 'react-native-elements';
import Barcode from '../../helpers/Barcode';
import CustomListItem from "../../helpers/CustomListItem";

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
            {}, 
            function(resultsAndParams){ return resultsAndParams.results; },
            function(){ console.log('Error getting myChocolates document'); });

        let myChocolatesResults = this.dbHandler.getData(myChocolatesRef, myChocolatesCallbacksAndParams);
        this.setState({ isLoading: true });

        myChocolatesResults
            .then(results => {
                let newMyChocolates = []; 
                for(let barcodeData in results.data()){
                    let barcodeType = results.data()[barcodeData];
                    let currBarcode = new Barcode(barcodeType, barcodeData);
                    let barcodeTypeRef = this.dbHandler.getRef(StringConcatenations.Prefix, currBarcode);
                    let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
                        newMyChocolates,
                        this.addToMyChocolatesList,
                        function(){ console.log('Error getting the following barcode: ', currBarcode); });
                    let barcodeTypeResults = this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
                }

                this.setState({ isLoading: false})
            })
            // User has no chocolates in myChocolates
            .catch( _ => {
                this.setState({ isLoading: false });
            });
    }

    addToMyChocolatesList(resultsAndParams){
        let newMyChocolates = resultsAndParams.params;
        newMyChocolates.push({key : resultsAndParams.results.data()});
        this.setState( { myChocolates: newMyChocolates } );
    }

    static navigationOptions = ({ navigation }) => ({
        title: "My Chocolates",
    })

    render(){
        const { myChocolates, isLoading } = this.state;

        if(isLoading){
            return <Text>Loading...</Text>
        }
        else {
            return(
                <View>
                    <FlatList
                        data={myChocolates}
                        renderItem={({_, index}) => this.renderItem(myChocolates[index].key)}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </View>
            );
        } 
    }

    renderItem(item){
        if(this.isValidItem(item)){
            return(
                <CustomListItem 
                    navigate={this.props.navigation.navigate}
                    results={item}
                    title={item.confectionName}
                    subtitle={"hello"}
                    shouldUserEditItem={true}
                />
            );
        }
        else{
            console.log("Invalid Barcode: ", item);
        }
    }

    isValidItem(item){
        return(
            typeof(item.barcodeData) !== 'undefined' && 
            typeof(item.barcodeType) !== 'undefined'
        );
    }
}