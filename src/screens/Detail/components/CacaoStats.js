import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text,
    View
} from 'react-native';
import { Colors } from '../../../helpers/Constants';

export default class UserRating extends Component {
	render() {
        const { percentage, type } = this.props;

		return (
			<View style={{
                flexDirection: "row",
                borderBottomColor: Colors.Primary, 
                borderBottomWidth: .5,
                height: 100,
                backgroundColor:"white",
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View >
                        <Image 
                            style={{height:40, width:40}}
                            source={require('../../../../assets/images/cacao_icon.png')}
                        />
                    </View>
                    <Text style={{fontSize:14}}> Cacao </Text>
                </View>

                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'center',
                }}>	
                    
                    { percentage ? this.renderPercentageFound(percentage) : this.renderPercentageNotFound()}

                    <Text style={{fontSize:14, textAlign:"center"}}>{type}</Text>
                </View>
            </View>
		);
    }
    
    renderPercentageFound(percentage){
        return(
            <Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
                {percentage}%
            </Text>
        );
    }

    renderPercentageNotFound(){
        return(
            <Text style={{textAlign:"center", fontSize: 14}}> 
                Unknown
            </Text>
        );
    }
}