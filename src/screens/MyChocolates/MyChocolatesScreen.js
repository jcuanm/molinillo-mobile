import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import CustomListItem from "../../helpers/CustomListItem";
import { Colors } from '../../helpers/Constants';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();

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
        let myChocolates = [];

        query 
            .get()
            .then(results => {
                results.forEach(function(doc){
                    myChocolates.push({key : doc.data()});
                })

                this.setState({myChocolates : myChocolates});
            })
            .catch(error => {
                console.log(error);
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