import React, { Component } from 'react';
import { 
  Image, 
  Text,
  TouchableOpacity, 
  View 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { AlgoliaSearchConfig } from '../../../../../assets/Config';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './components/SearchBox';
import InfiniteHits from './components/InfiniteHits';
import algoliasearch from 'algoliasearch/lite';
import { Colors } from '../../../../helpers/Constants';
import { SearchScreenStyles } from './styles';

export default class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.algoliaSearchClient = algoliasearch(AlgoliaSearchConfig.applicationID, AlgoliaSearchConfig.apiKey);
    this.root = {
      Root: View,
      props: {
        style: SearchScreenStyles.instantSearchBar,
      },
    };

    this.state = {
      filterForSale: false
    };
  }

  componentDidMount(){
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this.algoliaSearchClient.clearCache(); },
    );
  }

  componentWillUnmount(){
    this.didFocusListener.remove();
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Search",
    headerStyle: {
      backgroundColor: Colors.Primary,
    },
    headerTitleStyle: {
      color: Colors.Secondary
    },
    headerLeft: (
      <TouchableOpacity style={SearchScreenStyles.headerButton} >
        <Image 
          style={SearchScreenStyles.headerImage}
          source={require('../../../../../assets/images/logo.png')}
        />
      </TouchableOpacity>
    ),
  });

  render(){
    if(this.state.filterForSale){
      var buttonTextStyles = SearchScreenStyles.filterButtonTextActive;
      var buttonStyles = SearchScreenStyles.filterButtonActive;
    }
    else{
      var buttonTextStyles = SearchScreenStyles.filterButtonTextInactive;
      var buttonStyles = SearchScreenStyles.filterButtonInactive;
    }

    return(
      <View style={SearchScreenStyles.instantSearchBarContainer} >
        <InstantSearch
          searchClient={this.algoliaSearchClient}
          indexName={AlgoliaSearchConfig.indexName}
          root={this.root}
        >
          <SearchBox />

          {/* Button for filtering items based on if they're for sale or not */}
          <TouchableOpacity 
            onPress={() => this.setState({filterForSale: !this.state.filterForSale})}
            style={buttonStyles}
          >
            <Text style={buttonTextStyles}>
              For sale
            </Text>
          </TouchableOpacity>

          <InfiniteHits 
            filterForSale={this.state.filterForSale} 
            navigate={this.props.navigation.navigate}
          />

          <ActionButton
            buttonColor={Colors.Primary}
            icon={<Ionicons name="md-camera" size={25} color={Colors.Secondary} />}
            onPress={() => { this.props.navigation.navigate("ScannerScreen") }}
          />
        </InstantSearch> 
      </View>
    );
  }
}
