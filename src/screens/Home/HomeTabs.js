import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import SearchStack from '../../navigation/home_screen_stacks/SearchStack';
import ProfileStack from '../../navigation/home_screen_stacks/ProfileStack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../helpers/Constants';

export default HomeTabs = createMaterialBottomTabNavigator(
  {
    Search: { 
      screen : SearchStack,
      navigationOptions : {
        tabLabel: "Search",
        tabBarIcon: ({ tintColor }) => (    
            <Ionicons color={tintColor} size={28} name='md-search'/>  
          ),  
      }
    },
    Profile: { 
      screen : ProfileStack,
      navigationOptions : {
        tabLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (    
            <Ionicons color={tintColor} size={28} name='md-person'/>  
          ),  
      }
    },
  },
  {
    activeColor: 'rgba(255,255,255, 1)',
    inactiveColor: 'rgba(255,255,255, .6)',
    barStyle: {
      backgroundColor: Colors.Primary
    },
    labeled: false, 
  },
);
