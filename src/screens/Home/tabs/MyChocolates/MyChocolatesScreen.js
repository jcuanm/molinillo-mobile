import React, { Component } from 'react';
import { 
    FlatList, 
    ScrollView, 
    View 
} from 'react-native';
import ActionButton from 'react-native-action-button';
import DbHandler from '../../../../helpers/DbHandler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import CustomListItem from "../../../../helpers/shared_components/CustomListItem";
import Barcode from '../../../../helpers/Barcode';
import CallbacksAndParams from '../../../../helpers/CallbacksAndParams';
import { Colors, StringConcatenations } from '../../../../helpers/Constants';
import { MyChocolatesScreenStyles } from './styles';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.pushToMyChocolates = this.pushToMyChocolates.bind(this); 

        props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        this.state = {
            myChocolates: []
        }
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
          'didFocus',
          () => { this.getMyChocolates() },
        );
    }
    
    getMyChocolates(){
        let myChocolatesRef = firebase.firestore().collection("MyChocolates");
        let query = myChocolatesRef.where("userId", "==", this.dbHandler.currUser.uid);

        query 
            .get()
            .then(results => {
                let myChocolates = [];
                if(results.size > 0){
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
                }
                else{
                    this.setState({myChocolates: []});
                }  
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
        headerTintColor: Colors.Secondary,
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: Colors.Secondary
        },
        title: "My Chocolates"
    });

    render(){
        const { myChocolates } = this.state;
        return(
            <View style={MyChocolatesScreenStyles.container}>
                <ScrollView>
                    <FlatList
                        data={myChocolates}
                        scrollEnabled={true}
                        renderItem={({_, index}) => this.renderItem(myChocolates[index].key)}
                        keyExtractor={(_, index) => index.toString()}
                    /> 
                </ScrollView>
                <ActionButton
                    buttonColor={Colors.Primary}
                    icon={<Ionicons name="md-camera" size={25} color={Colors.Secondary} />}
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
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
