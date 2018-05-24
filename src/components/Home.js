import React, { Component } from 'react';
import { View, Text, TextInput, Platform, PermissionAndroid, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "Home",
    title: "Home",
    headerLeft: (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    )
  });

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}
