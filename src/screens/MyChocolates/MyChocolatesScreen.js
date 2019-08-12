import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import CustomListItem from "../../helpers/CustomListItem";
import Barcode from '../../helpers/Barcode';
import CallbacksAndParams from '../../helpers/CallbacksAndParams';
import { Colors, StringConcatenations } from '../../helpers/Constants';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.pushToMyChocolates = this.pushToMyChocolates.bind(this); 

        this.state = {
            myChocolates: []
        }
    }

    componentWillMount(){
        this.getMyChocolates();
    }

    getMyChocolates(){
        let myChocolatesRef = firebase.firestore().collection("MyChocolates");
        let query = myChocolatesRef.where("userId", "==", this.dbHandler.currUser.uid);

        query 
            .get()
            .then(results => {
                let myChocolates = [];
                results.forEach(doc => {
                    const {
                        barcodeType, 
                        barcodeData, 
                        uuid
                    } = doc.data();

                    let currBarcode = new Barcode(barcodeType, barcodeData);
                    let barcodeTypeRef = this.dbHandler.getRef(
                        StringConcatenations.Prefix, 
                        currBarcode,
                        uuid);
                    let barcodeTypeCallbacksAndParams = new CallbacksAndParams(
                        myChocolates,
                        this.pushToMyChocolates,
                        function(){ console.log("Could not find chocolate"); }
                    );
                    
                    this.dbHandler.getData(barcodeTypeRef, barcodeTypeCallbacksAndParams);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    pushToMyChocolates(resultsAndParams){
        let myChocolates = resultsAndParams.params;
        let results = resultsAndParams.results.data();

        myChocolates.push({key : results});

        this.setState({
            myChocolates: myChocolates
        });
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
        const { myChocolates } = this.state;
            return(
                <ScrollView>
                    <FlatList
                        data={myChocolates}
                        scrollEnabled={true}
                        renderItem={({_, index}) => this.renderItem(myChocolates[index].key)}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </ScrollView>
            );
    }

    renderItem(item){
        return(
            <CustomListItem 
                navigate={this.props.navigation.navigate}
                results={item}
                parentScreen={"MyChocolates"}
            />
        );
    }
}