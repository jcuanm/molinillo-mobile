import { Dimensions, StyleSheet } from 'react-native';

export const OrderHistoryScreenStyles = StyleSheet.create({
    container: {
        flex: 1
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
});

export const PastOrderStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection:"row",
        backgroundColor: "white",
        width: Dimensions.get('window').width, 
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent:"center"
    },
    orderInfoContainer: {
        flex:1
    },
    orderInfoSubtitle: {
        fontWeight:"bold"
    },
    title: {
        fontSize: 25, 
        textAlign: 'center'
    }
});
