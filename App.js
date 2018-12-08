import React from 'react'
import {createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';  // Tab Nav

 const rootDrawer = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (<Ionicons name="md-checkmark-circle" size={32} color="green" />),
    }
  },
});

const App = createAppContainer(rootDrawer);

export default App;