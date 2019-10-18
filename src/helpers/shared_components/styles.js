import { Dimensions, StyleSheet } from 'react-native';

export const CustomListItemStyles = StyleSheet.create({
    container: {
        paddingBottom: 10
    },
    listingImage: {
        width: Dimensions.get('window').width, 
        height: 200
    },
    listingTitle: {
        fontWeight:"bold"
    },
    listingSubtitle: {
        fontSize: 12, 
        fontWeight: 'bold'
    }
});