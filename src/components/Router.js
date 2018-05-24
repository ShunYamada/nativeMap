import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Home from './Home';
import Create from './Create';
import AnimatedView from './AnimatedView';
import DrawerMenu from './common/DrawerMenu';

const MainScreenNavigator = StackNavigator({
  AnimatedView: { screen: AnimatedView },
  Home: { screen: Home }
});

const MainDrawer = DrawerNavigator(
  {
    Main: { screen: MainScreenNavigator }
  },
  {
    contentComponent:  DrawerMenu,
    drawerWidth: 200
  }
);

const MainNavigator = StackNavigator({
  Home: { screen: Home },
  Create: { screen: Create },
  AnimatedView: { screen: AnimatedView }
}, {
  initialRouteName: 'AnimatedView',
  mode: 'modal'
});

export default MainDrawer;
