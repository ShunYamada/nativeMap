import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  PermissionsAndroid,
  Platform
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
       coords: null,
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
    const { name, amount, category, navigation } = this.props;
    const { latitude, longitude } = this.state.coords;

    this.props.placeCreate({ name, amount, category, navigation, latitude, longitude });
  }

  async componentDidMount() {
    try {
      const position = await getCurrentPosition(5000);
      const { latitude, longitude } = position.coords;
      this.setState({
        coords: {
          latitude,
          longitude
        }
      })
      this.props.navigation.setParams({ handleSave: this.onButtonPress.bind(this) });
    } catch(e) {
      alert(e.message)
    }
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
              onChangeText={value => this.props.placeUpdate({ prop: 'amount', value })}
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

async function getCurrentPosition(timeoutMillis = 10000) {
  if (Platform.OS === "android") {
      const ok = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (!ok) {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              // TODO ユーザーにGPS使用許可がもらえなかった場合の処理
          }
      }
  }

  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: timeoutMillis });
  });
}

const mapStateToProps = (state) => {
  const { name, amount, category, latitude, longitude } = state.placeForm;

  return { name, amount, category, latitude, longitude };
};

export default connect(mapStateToProps, {
  placeUpdate, placeCreate
})(Create);
