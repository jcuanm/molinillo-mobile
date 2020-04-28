import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomListItem from "../../../../../helpers/shared_components/CustomListItem";
import { connectInfiniteHits } from 'react-instantsearch-native';
import { InfiniteHitsStyles } from '../styles';

function InfiniteHits({ hits, hasMore, refine, navigate, filterForSale }){
  if(filterForSale){
    hits = hits.filter(function(el){ return el.price > 0 });
  }

  return(
    <FlatList
      data={hits}
      keyExtractor={item => item.objectID}
      ItemSeparatorComponent={() => <View style={InfiniteHitsStyles.separator} />}
      onEndReached={() => hasMore && refine()}
      renderItem={({ item }) => renderItem(item, navigate) }
    />
  );
}

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
