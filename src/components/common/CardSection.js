import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#eee',
    position: 'relative'
  }
});

export default (props: Props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};
