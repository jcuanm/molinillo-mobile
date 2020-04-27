import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const DetailScreenStyles = StyleSheet.create({
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1, 
        flexWrap: 'wrap'
    }, 
    image: {
        width: Dimensions.get('window').width, 
        height:Dimensions.get('window').height/3
    },
    viewCommentsButtonContainer: {
        paddingLeft:15
    },
    viewCommentsButtonText: {
        fontSize:14, 
        paddingTop:5, 
        paddingBottom:5, 
        color:'rgba(0, 0, 0, .4)', 
        textDecorationLine:'underline'
    } 
});

export const CacaoStatsStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: Colors.Primary, 
        borderBottomWidth: .5,
        height: 100,
        backgroundColor: Colors.Secondary,
    },
    iconBlock: {
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 14
    },
    iconImage: {
        height:40, 
        width:40
    },
    percentageBlock: {
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
    },
    percentageText: {
        textAlign:'center', 
        fontSize: 30, 
        fontWeight: 'bold'
    },
    unknownText: {
        textAlign:'center', 
        fontSize: 14
    }
});

export const ChocolateNameStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
        backgroundColor: Colors.Secondary
    },
    chocolateNameBlock: {
        width: Dimensions.get('window').width,
        justifyContent:'center',
        paddingLeft: 25, 
        paddingRight: 25,
    },
    producerName: {
        fontWeight:'bold',
        fontSize:14
    }
});

export const CommentStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Secondary, 
        width: Dimensions.get('window').width,
        marginBottom: 8,
        paddingLeft:15
    },
    userDisplayName: {
        fontWeight:'bold', 
        paddingBottom: 3
    },
    dateCreated: {
        fontSize: 12, 
        fontWeight:'normal', 
        fontStyle:'italic', 
        color:'rgba(0, 0, 0, .4)'
    },
    starRating: {
        paddingRight: Dimensions.get('window').width * .75
    },
    commentText: {
        fontSize:12, 
        paddingBottom: 5
    }
});

export const CommerceStyles = StyleSheet.create({
    border: {
        borderBottomColor: "black", 
        borderBottomWidth: .5
    },
    addToCartButton: {
        backgroundColor: "gold", 
        padding:5, 
        margin: 20,
        width: Dimensions.get('window').width / 2
    },
    buttonText: {
        textAlign:"center", 
        fontWeight:"bold"
    },
    container: {
        flexDirection: 'row',
        height: 80,
        paddingLeft: 25,
    },
    column: {
        fontWeight:'bold', 
        paddingBottom: 3
    },
    purchaseText: {
        color:"green", 
        fontSize:14, 
        paddingBottom:3
    },
    iosQuantityText: {
        fontWeight:"bold", 
        color: Colors.Secondary, 
        textAlign:"center", 
        fontSize:18
    },
    priceValue: {
        fontSize: 14, 
        fontWeight: 'bold',
        paddingBottom:3
    },
    pickerContainer: {
        flexDirection:"row", 
        paddingBottom:16
    },
    picker: {
        justifyContent:"center",
        backgroundColor: Colors.Primary,
        color: Colors.Secondary,
        borderBottomWidth: 2,
        width:40,
        height:30,
    },
    qtyText: {
        paddingRight: 3, 
        fontSize:14
    },
    popupModal: {
        alignContent: 'center',
        alignSelf:"center"
    },
    popupFlatlistContainer: {
        width: 300
    },
    popupEntriesBackground: {
        backgroundColor: Colors.Secondary, 
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey"
    },
    popupEntriesText: {
        textAlign:'center', 
        fontSize: 20
    },
});

export const CountryOriginStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: Colors.Primary, 
        borderBottomWidth: .5,
        height: 100,
        backgroundColor: Colors.Secondary,
    },
    iconBlock: {
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        textAlign:'center', 
        fontSize:14, 
        paddingLeft: 10, 
        paddingRight: 10
    },
    countryFlag: {
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countryName: {
        textAlign:'center', 
        fontSize: 14 
    }
});

export const DescriptionStyles = StyleSheet.create({
    container: {
        fontSize: 12, 
        paddingLeft: 25, 
        paddingRight: 25, 
        paddingBottom:10
    }
});

export const HeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        paddingLeft: 25
    },
    heartIcon: {
        width: Dimensions.get('window').width / 2,
        justifyContent:'center',
        fontSize:18
    },
    ratingBlock: {
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
    },
    starIcon: {
        textAlign:'center', 
        fontSize: 30, 
        fontWeight: 'bold'
    },
    numRatingsText: {
        fontSize:12, 
        textAlign:'center', 
        color:'rgba(0, 0, 0, .4)'
    },
    ratingsTitle: {
        fontStyle:'italic'
    }
});

export const UserRatingStyles = StyleSheet.create({
    container: {
        padding:15, 
        paddingLeft:110, 
        paddingRight:110, 
        borderBottomColor: Colors.Primary, 
        borderBottomWidth: .5
    },
    subtext: {
        fontSize: 12, 
        paddingTop: 5, 
        color: 'rgba(0, 0, 0, .4)', 
        textAlign: 'center'
    },
    popupTextInputContainer: {
        backgroundColor:Colors.Primary, 
        width: 330, 
        height: 190, 
        alignContent:"center", 
        justifyContent:"center"
    },
    popupTextInputTitle: {
        margin:5, 
        fontSize: 14, 
        fontWeight:"bold",
        flex:1,
        justifyContent:"flex-start",
        color:"white"
    },
    popupTextInputArea: {
        backgroundColor:"white", 
        marginLeft:5, 
        height: 120, 
        width:320, 
        borderColor: 'gray', 
        borderWidth: 1
    },
    popupInputTextButton: {
        backgroundColor:"white", 
        justifyContent: 'center', 
        height: 30, 
        width:155, 
        margin: 5
    },
    popupCancelButtonText: {
        textAlign:"center", 
        color: "red"
    },
    popupSubmitButtonText: {
        textAlign:"center", 
        color: Colors.Primary
    },
    popupSubmitButton: {
        backgroundColor:"white", 
        justifyContent: 'center', 
        height: 30, 
        width:155, 
        margin: 5
    },
    popupButtonContainer: {
        flexDirection:"row"
    },
    popupInputTextHeader: {
        flexDirection: "row"
    },
    refreshIcon: {
        alignItems:"center", 
        margin: 5, 
        flex: 1, 
        justifyContent: "flex-end"
    }
});

export const VendorAddressStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: Colors.Primary, 
        borderBottomWidth: .5,
    },
    addressIcon: {
        width: Dimensions.get('window').width / 2,
        height: 100,
        backgroundColor: Colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    addressTitle: {
        textAlign:'center', 
        fontSize:14, 
        paddingLeft: 10, 
        paddingRight: 10
    },
    addressTextBlock: {
        width: Dimensions.get('window').width / 2,
        height: 100,
        backgroundColor: Colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressText: {
        fontSize:14, 
        textAlign:'center'
    }
});

export const WouldBuyStyles = StyleSheet.create({
    border: {
        borderBottomColor: "black", 
        borderBottomWidth: .5
    },
    reasonButton: {
        flex:1,
        padding:5, 
        margin: 20,
        width: Dimensions.get('window').width / 2
    },
    buttonText: {
        textAlign:"center", 
        fontWeight:"bold",
        color:"white"
    },
    container: {
        flexDirection: 'row',
        height: 25,
        paddingLeft: 25,
    },
    column: {
        fontWeight:'bold', 
        paddingBottom: 3
    },
    row: {
        flexDirection:"row"
    },
    purchaseText: {
        color:Colors.Primary, 
        fontWeight: 'bold',
        fontSize:14, 
        paddingBottom:3
    },
    subtitle: {
        fontSize: 14, 
        paddingBottom:3
    },
});
