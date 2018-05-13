import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardSection from './common/CardSection';
import Input from './common/Input';

const styles = StyleSheet.create({
  headerIcon: {
    paddingHorizontal: 15
  },
});

export default class Create extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Seat',
      headerStyle: {
        backgroundColor: '#00a0d8',
      },
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'bold'
      },
      headerLeft: (
        <TouchableOpacity
          onPress={()=> navigation.goBack()}
          style={styles.headerIcon}
        >
          <Icon name='close' size={28} style={{color: '#fff'}}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <Button
          color={'#fff'}
          title="Post"
        />
      )
    };
  };

  render() {
    return (
      <ScrollView>
        <CardSection>
           <Input
             label={'Space Name'}
             description={'施設の名称'}
             placeholder={'What is the seat called?'}
             onChangeText={value => this.props.seatUpdate({ prop: 'name', value })}
           />
         </CardSection>
         <CardSection>
            <Input
              label={'Price'}
              description={'家賃'}
              placeholder={'How much do you sell?'}
              keyboardType={'numeric'}
              onChangeText={value => this.props.seatUpdate({ prop: 'price', value })}
            />
          </CardSection>
      </ScrollView>
    );
  }
}
