import React, { Component } from 'react';
import { View, Text, TextInput, Platform, PermissionAndroid, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      coords: null
    }
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
    } catch(e) {
      alert(e.message)
    }
  }

  render() {
    return (
      <View
        style={styles.map}
      >
        {
          this.state.coords ?
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.state.coords.latitude,
              longitude: this.state.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          :
          <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 35.6797392,
            longitude: 139.7348855,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        }
        <TouchableOpacity
          style={styles.fabContainer}
          onPress={()=>this.props.navigation.navigate('Create')}
        >
          <Icon name={'camera'} size={28} style={styles.icon} />
    			<Text style={styles.btnText}> Create </Text>
    		</TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject, },
  fabContainer: {
    backgroundColor:'#00a0d8',
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right:20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    }
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
  icon: {
    color: '#fff'
  }
});
