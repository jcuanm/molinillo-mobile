import React, { Component } from 'react';
import { 
    FlatList,
    Text, 
    View
 } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { StringConcatenations } from '../../helpers/Constants';
import Barcode from '../../helpers/Barcode';
import CustomListItem from "../../helpers/CustomListItem";
import { Colors } from '../../helpers/Constants';

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
            function(){ console.log('No chocolates in MyChocolates'); });

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
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: "My Chocolates",
    })

    render(){
        const { myChocolates, isLoading } = this.state;

        if(isLoading){
            return <Text>Loading...</Text>
        }
        else if(myChocolates !== undefined && myChocolates.length > 0){
            return(
                <View>
                    <FlatList
                        data={myChocolates}
                        scrollEnabled={true}
                        renderItem={({_, index}) => this.renderItem(myChocolates[index].key)}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </View>
            );
        }
        else{
            return <Text>No Chocolates</Text>
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
                    parentScreen={"MyChocolates"}
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