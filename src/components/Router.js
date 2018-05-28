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
}, {
  haderMode: 'none'
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
  MainDrawer: { screen: MainDrawer },
  Create: { screen: Create },
}, {
  initialRouteName: 'MainDrawer',
  mode: 'modal',
});

export default MainNavigator;
