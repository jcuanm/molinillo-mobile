import React, { Component } from 'react';
import { 
    Image,
    Text,
    View
} from 'react-native';
import { CacaoStatsStyles } from '../styles';

export default class CacaoStats extends Component {
	render() {
        const { percentage, type } = this.props;

		return (
			<View style={CacaoStatsStyles.container}>
                <View style={CacaoStatsStyles.iconBlock}>
                    <View >
                        <Image 
                            style={CacaoStatsStyles.iconImage}
                            source={require('../../../../assets/images/cacao_icon.png')}
                        />
                    </View>
                    <Text style={CacaoStatsStyles.iconText}> Cacao </Text>
                </View>

                <View style={CacaoStatsStyles.percentageBlock}>	
                    { percentage != "Unknown" ? this.renderPercentageFound(percentage) : this.renderPercentageNotFound()}
                </View>
            </View>
		);
    }
    
    renderPercentageFound(percentage){
        return(
            <Text style={CacaoStatsStyles.percentageText}> 
                {percentage}%
            </Text>
        );
    }

    renderPercentageNotFound(){
        return(
            <Text style={CacaoStatsStyles.unknownText}> 
                Unknown %
            </Text>
        );
    }
}
