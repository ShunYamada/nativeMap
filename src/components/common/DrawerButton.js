import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  drawerMenu: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 20,
    left: 20,
    height: 34,
    width: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    }
  },
  photo: {
    borderRadius: 15,
  },
  photoImage: {
    height: 30,
    width: 30,
  },
  photoIcon: {
    fontSize: 30,
    height: 30,
  }
});

export default class DrawerButton extends React.Component {
  render() {
    return(
      <TouchableOpacity
        style={styles.drawerMenu}
        onPress={() => this.props.navigation.navigate("DrawerOpen")}
      >
      <Icon name="menu" style={{ color: '#fff' }} />
      </TouchableOpacity>
    );
  }
}
