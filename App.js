import React from 'react'
import {createAppContainer, createDrawerNavigator } from 'react-navigation';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import Home from './Home';  // Tab Nav

 const rootDrawer = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (<MaterialCommunityIcons name="home" size={27} color="green" />),
    }
  },
});

const App = createAppContainer(rootDrawer);

export default App;