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
import { AlgoliaSearchConfig } from '../../../../../assets/Config';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './components/SearchBox';
import InfiniteHits from './components/InfiniteHits';
import algoliasearch from 'algoliasearch/lite';
import styles from '../../../../styles';

export default class SearchScreen extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
        this.algoliaSearchClient = algoliasearch(AlgoliaSearchConfig.applicationID, AlgoliaSearchConfig.apiKey);
        this.root = {
            Root: View,
            props: {
                style: {
                    flex: 1,
                },
            },
        };
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

    render(){
        return(
            <View style={styles.container}>
                <InstantSearch
                    searchClient={this.algoliaSearchClient}
                    indexName={AlgoliaSearchConfig.indexName}
                    root={this.root}
                >
                    <SearchBox />
                    <InfiniteHits />
                </InstantSearch>

                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
                />
            </View>
        );
    }
}