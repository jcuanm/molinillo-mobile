import { StyleSheet } from 'react-native';
import { Colors } from '../../../../helpers/Constants';

export const SearchScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.Secondary,
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerImage: {
        height:40, 
        width:40
    },
    instantSearchBarContainer: {
        flex: 1
    },
    instantSearchBar: {
        flex: 1
    },
    filterButtonInactive:{
        width: 150,
        height: 30,
        backgroundColor: Colors.Primary,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.Primary,
    },
    filterButtonActive:{
        width: 150,
        height: 30,
        backgroundColor: Colors.Secondary,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.Primary,
    },
    filterButtonTextInactive: {
        color:Colors.Secondary, 
        fontWeight:"bold",
        textAlign: "center"
    },
    filterButtonTextActive: {
        color:Colors.Primary, 
        fontWeight:"bold",
        textAlign: "center"
    }
});

export const InfiniteHitsStyles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    }
});

export const SearchBoxStyles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 48,
        padding: 12,
        fontSize: 16,
        backgroundColor: Colors.Secondary,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});

