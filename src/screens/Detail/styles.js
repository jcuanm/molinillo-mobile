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
        fontSize: 10
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
        paddingLeft: 30, 
        paddingRight: 25,
        fontSize:18
    },
    producerName: {
        fontWeight:'bold'
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
        paddingLeft: 30, 
        paddingRight: 25, 
        paddingBottom:10
    }
});

export const HeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: Colors.Secondary
    },
    heartIcon: {
        width: Dimensions.get('window').width / 2,
        justifyContent:'center',
        paddingLeft: 25, 
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
        borderBottomColor: 
        Colors.Primary, 
        borderBottomWidth: .5
    },
    subtext: {
        fontSize: 12, 
        paddingTop: 5, 
        color: 'rgba(0, 0, 0, .4)', 
        textAlign: 'center'
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

export const VendorWebsiteStyles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconBlock: {
        width: Dimensions.get('window').width / 2,
        height: 100,
        backgroundColor: Colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        textAlign:"center", 
        fontSize:14, 
        paddingLeft: 10, 
        paddingRight: 10
    },
    linkBlock: {
        width: Dimensions.get('window').width / 2,
        height: 100,
        backgroundColor: Colors.Secondary,
        justifyContent: 'center',
        alignItems: "center"
    },
    linkText: {
        fontSize:14, 
        textAlign:"center", 
        color: Colors.Primary, 
        fontWeight:"bold"
    }
});
