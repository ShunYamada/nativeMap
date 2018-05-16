import firebase from 'react-native-firebase';
import {
  PLACE_UPDATE,
  PLACE_CREATE,
  PLACES_FETCH_SUCCESS
} from './types';

export const placeUpdate = ({ prop, value }) => {
  return {
    type: PLACE_UPDATE,
    payload: { prop, value }
  };
};

export const placeCreate = ({ name, amount, category, navigation, latitude, longitude }) => {
  return (dispatch) => {
    firebase.database().ref(`/places`)
      .push({
        id: new Date(),
        name,
        amount,
        category,
        coordinate: {
          latitude,
          longitude
        }
      })
      .then(() => {
        dispatch({ type: PLACE_CREATE });
        navigation.navigate('AnimatedView');
      });
  };
};

export const placesFetch = () => {
  return (dispatch) => {
    console.log('####', this.props);
    firebase.database().ref(`/places`)
      .on('value', snapshot => {
        dispatch({ type: PLACES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
