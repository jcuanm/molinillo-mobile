import React, { Component } from 'react';
import { 
    FlatList, 
    Text, 
    TouchableOpacity,
    View 
} from 'react-native';
import DbHandler from '../../../../helpers/DbHandler';
import { ListItem, SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import styles from '../../../../styles';

export default class SearchScreen extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
        this.state = {
            searchInput: ''
        }

        this.updateInput = this.updateInput.bind(this); 
        this.renderHeader = this.renderHeader.bind(this);
        this.searchRef = '';
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Search",
        headerLeft: (
            <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.openDrawer()}
            >
                <Ionicons name="md-menu" size={32} />
            </TouchableOpacity>
        ),
    })

    updateInput(input){
        this.setState({ searchInput : input });
    }

    renderHeader(){
        const { searchInput } = this.state;
        return(
            <SearchBar 
                ref={searchRef => this.searchRef = searchRef }
                placeholder='Search Molinillo' 
                clearIcon={{name: 'clear'}}
                onChangeText={this.updateInput}
                lightTheme 
                round 
            />
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={[{key:'a'}, {key:'b'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                    ListHeaderComponent={this.renderHeader}
                />
                
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}