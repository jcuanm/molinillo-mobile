import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    FlatList
 } from 'react-native';
import DbHandler from '../../helpers/DbHandler';
import styles from '../../styles';
import { SearchBar } from 'react-native-elements';

export default class MyChocolatesScreen extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
      }

    static navigationOptions = ({ navigation }) => ({
        title: "My Chocolates",
    })
    
    render() {
        // var myChocolatesUsersRef = this.dbHandler.getRef(Collections['myChocolatesUsers']);
        // myChocolatesUsersRef.get()
        //     .then(doc => {
        //         if (doc.exists) {
        //             console.log('Document data:', doc.data());
        //         }
        //         else{

        //             console.log("Womp", doc.data());
        //         }
        //     })
        //     .catch(err => {
        //         console.log('Error getting document', err);
        //     });
        return (
            <View style={styles.container}>
                <SearchBar
                    onChangeText={() => console.log("Typeing...")}
                    onClear={() => console.log("Cleared...")}
                    placeholder='Type Here...' 
                    clearIcon={{name: 'clear'}}
                />

                <FlatList
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        );
    }
}