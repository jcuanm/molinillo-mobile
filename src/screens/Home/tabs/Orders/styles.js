import { Dimensions, StyleSheet } from 'react-native';

export const OrderScreenStyles = StyleSheet.create({
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
    }
});

export const OrderStyles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        flexDirection:"row",
        backgroundColor: "white",
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height/4,
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
    incomeTitle: {
        fontSize: 25, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: 'green'
    },
    incomeAmount: {
        fontSize: 25, 
        textAlign: 'center'
    }
});
