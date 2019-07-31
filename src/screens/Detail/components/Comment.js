import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text, 
    TouchableOpacity,
    View
} from 'react-native';
import { ListItem } from 'react-native-elements';
import DbHandler from '../../../helpers/DbHandler';
import Barcode from '../../../helpers/Barcode';
import { Colors } from '../../../helpers/Constants';

export default class Comment extends Component {
    constructor(props){
        super(props);
        this.dbHandler = new DbHandler();
    }

    render(){
        return(
            <View 
                style={{
                    backgroundColor:"white", 
                    width:Dimensions.get("window").width,
                    marginBottom:5
                }
            }>
                <View style={{paddingLeft: 15}}>
                    <Text style={{fontWeight:'bold', paddingBottom: 3}}>
                        {this.dbHandler.currUser.displayName} 
                        <Text style={{fontSize: 12, fontWeight:'normal', fontStyle:'italic', color:'rgba(0, 0, 0, .4)'}}> March 20, 1996</Text>
                    </Text>
                    <Text style={{fontSize:12}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu ligula sit amet erat faucibus mollis. Integer quis nibh tincidunt, semper justo non, euismod sapien. In hac habitasse platea dictumst. Pellentesque sollicitudin diam nec ante imperdiet mollis. Sed ante turpis, mattis aliquet tortor ac, commodo congue eros. Maecenas sodales dui.
                    </Text>
                </View>
            </View>
        );
    }
}