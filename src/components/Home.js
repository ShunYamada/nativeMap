import React, { Component } from 'react';
import { View, Text, TextInput, Platform, PermissionAndroid } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default class Home extends Component {

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
});
