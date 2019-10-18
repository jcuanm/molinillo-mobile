import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomListItem from "../../../../../helpers/CustomListItem";
import { connectInfiniteHits } from 'react-instantsearch-native';
import { InfinitHitsStyles } from '../styles';

const InfiniteHits = ({ hits, hasMore, refine, navigate }) => (
  <FlatList
    data={hits}
    keyExtractor={item => item.objectID}
    ItemSeparatorComponent={() => <View style={InfinitHitsStyles.separator} />}
    onEndReached={() => hasMore && refine()}
    renderItem={({ item }) => renderItem(item, navigate) }
  />
);

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

function renderItem(item, navigate){
  return( 
    <CustomListItem 
      navigate={navigate}
      results={item}
      parentScreen={"Search"}
    />
  );
}

export default connectInfiniteHits(InfiniteHits);
