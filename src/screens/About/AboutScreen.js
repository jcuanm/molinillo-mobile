import React, { Component } from 'react';
import { 
    Dimensions,
    Image,
    View, 
    Text
 } from 'react-native';
 import { Colors } from '../../helpers/Constants';
 
export default class AboutScreen extends Component {
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: "Our Story",
    }

    render(){
        return(
            <View>
                <View style={{alignItems:'center', justifyContent:'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height/3, backgroundColor: Colors.Secondary }}>
                    <Image  
                        style={{width:100, height: 160}}
                        source={require('../../../assets/images/logo_white.png')}
                    />
                </View>
                <Text style={{paddingRight:20, paddingLeft: 20 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis erat, egestas vel augue in, feugiat semper justo. Curabitur semper diam id mi consequat semper. Nulla semper varius risus at feugiat. Morbi velit augue, dictum non ullamcorper id, molestie sit amet turpis. Praesent at ipsum odio. In gravida, arcu vel varius aliquam, magna arcu feugiat eros, id porttitor nisi ipsum eget est. In aliquet ante at purus eleifend, euismod feugiat urna venenatis.

                    Morbi tincidunt massa ornare, dictum nibh vel, tempus enim. Sed fermentum commodo diam, eget pulvinar eros suscipit eu. Ut orci tellus, rutrum vitae commodo eu, sollicitudin at nulla. Vivamus volutpat nec neque in sodales. Duis sodales cursus velit. Mauris sapien urna, aliquam a dui a, tincidunt rhoncus urna. Duis metus erat, pellentesque vel turpis ut, viverra pretium leo. Proin rutrum nec augue eget lacinia. Maecenas vel diam dolor. Donec rutrum ante in nisl convallis, et dapibus metus porttitor. Praesent sit amet efficitur velit. Quisque dignissim, nulla vitae rhoncus tempus, eros felis consequat sem, eget malesuada leo quam in libero.

                    Aenean sit amet dictum sapien. Sed auctor est id laoreet consequat. Ut a augue id libero pellentesque accumsan in dictum felis. In sit amet orci quis justo eleifend rutrum. Ut est odio, placerat ac dignissim ut, porttitor quis odio. Etiam placerat nisi mi, ac gravida sem tincidunt sed. Fusce non lorem dui. Nulla tincidunt blandit odio id sagittis. Ut vehicula sapien ac odio tincidunt lobortis ultrices vel tellus. Proin ornare, nulla sed ultricies finibus, sem justo condimentum justo, a. 
                </Text> 
            </View>
        );
    }
}