import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    Text, 
    TouchableOpacity 
} from 'react-native';
import { ListItem } from 'react-native-elements';

export default class CustomListItem extends Component {
    render(){
        const { 
            navigate, 
            results, 
            title, 
            shouldUserEditItem,
            subtitle,
        } = this.props;

        return(
            <TouchableOpacity
                onPress={ () => navigate(
                    "DetailScreen",
                    { 
                        results : results, 
                        shouldUserEditItem : shouldUserEditItem,
                    })}
            >
                <Image 
                    style={{width: Dimensions.get('window').width, height: 200}}
                    source={{ uri : results.imageDownloadUrl }}
                />
                <ListItem
                    title={<Text>{ title }</Text>}
                    subtitle={<Text>{ subtitle }</Text>}
                />
            </TouchableOpacity>
        );
    }
}