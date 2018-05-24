import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationActions } from 'react-navigation';

class DrawerMenu extends React.Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={this.navigateToScreen('Home', { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={this.navigateToScreen('AnimatedView', { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>AnimatedView</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    backgroundColor: "rgba(12, 12, 12, 0.2)",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20
  }
});

export default DrawerMenu;
