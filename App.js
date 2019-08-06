import React, { Component } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import './src/scripts/fixtimerbug';

export default class App extends Component{
  render() { return ( <RootNavigator /> );}
}