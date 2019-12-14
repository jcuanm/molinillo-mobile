import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';
import { SearchBoxStyles } from '../styles';

const SearchBox = ({ currentRefinement, refine }) => (
  <View style={SearchBoxStyles.container}>
    <TextInput
      maxLength={255}
      clearButtonMode={"always"}
      style={SearchBoxStyles.input}
      onChangeText={value => refine(value)}
      value={currentRefinement}
      placeholder="Search Molinillo"
    />
  </View>
);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
