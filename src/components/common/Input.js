import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const styles = StyleSheet.create({
  input: {
    color: '#000',
    fontSize: 16,
    lineHeight: 23,
    flex: 2,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    paddingLeft: 10,
    paddingBottom: 10,
    flex: 1
  },
  description: {
    fontSize: 12,
    paddingLeft: 10,
    flex: 1,
    color: '#666666',
  },
  container: {
    height: 70,
    flex: 1,
  }
});

export default ({ label, description, value, onChangeText, placeholder, keyboardType, secureTextEntry }) => {
  return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCorrect={false}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
  );
};
