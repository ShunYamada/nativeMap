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
import { connect } from 'react-redux';
import { placeUpdate, placeCreate } from '../actions';
import CardSection from './common/CardSection';
import Input from './common/Input';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  headerIcon: {
    paddingHorizontal: 15
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      flex: 2,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderRadius: 4,
      color: '#000',
      fontSize: 16,
      lineHeight: 23,
      paddingLeft: 10,
    },
    icon: {
      display: 'none'
    }
});

class Create extends Component {
  constructor(props) {
     super(props);
     this.inputRefs = {};
     this.state = {
       favColor: undefined,
       items: [
           {
             label: 'Red',
             value: 'red',
           },
           {
             label: 'Orange',
             value: 'orange',
           },
           {
             label: 'Blue',
             value: 'blue',
           },
       ],
     };
   }

  onButtonPress() {
    const { name, price, category, navigation } = this.props;

    this.props.placeCreate({ name, price, category, navigation });
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.onButtonPress.bind(this) });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
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
          onPress={() => params.handleSave()}
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
             onChangeText={value => this.props.placeUpdate({ prop: 'name', value })}
           />
         </CardSection>
         <CardSection>
            <Input
              label={'Price'}
              description={'家賃'}
              placeholder={'How much do you sell?'}
              keyboardType={'numeric'}
              onChangeText={value => this.props.placeUpdate({ prop: 'price', value })}
            />
          </CardSection>
          <CardSection>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.description}>施設の種類</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select a color...',
                      value: null,
                  }}
                  items={this.state.items}
                  onValueChange={(value) => {
                      this.props.placeUpdate({
                          prop: 'category',
                          value
                      });
                  }}
                  onUpArrow={() => {
                      this.inputRefs.name.focus();
                  }}
                  onDownArrow={() => {
                      this.inputRefs.picker2.togglePicker();
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.favColor}
                  ref={(el) => {
                      this.inputRefs.picker = el;
                  }}
              />
          </CardSection>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, price, category } = state.placeForm;

  return { name, price, category };
};

export default connect(mapStateToProps, {
  placeUpdate, placeCreate
})(Create);
