import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Create from './Create';
import AnimatedView from './AnimatedView';

export default StackNavigator({
  Home: { screen: Home },
  Create: { screen: Create },
  AnimatedView: { screen: AnimatedView }
}, {
  initialRouteName: 'AnimatedView',
  mode: 'modal'
});
