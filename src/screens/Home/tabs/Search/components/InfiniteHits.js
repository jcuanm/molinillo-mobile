import React from 'react';
import { 
  FlatList,
  StyleSheet, 
  Text,
  TouchableOpacity, 
  View, 
} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { connectInfiniteHits } from 'react-instantsearch-native';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 10,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

function renderItem(item, index){
  return( 
    <TouchableOpacity>
      <ListItem
        roundAvatar
        title={<Text>{item.confectionName}</Text>}
        subtitle={<Text>{index.toString()}</Text>}
      />
    </TouchableOpacity>
  );
}

const InfiniteHits = ({ hits, hasMore, refine }) => (
  <FlatList
    data={hits}
    keyExtractor={item => item.objectID}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    onEndReached={() => hasMore && refine()}
    renderItem={({ item, index }) => renderItem(item, index) }
  />
);

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);
