import firebase from 'react-native-firebase';
import {
  PLACE_UPDATE,
  PLACE_CREATE
} from './types';

export const placeUpdate = ({ prop, value }) => {
  return {
    type: PLACE_UPDATE,
    payload: { prop, value }
  };
};

export const placeCreate = ({ name, price, category, navigation }) => {

  return (dispatch) => {
    firebase.database().ref(`/places`)
      .push({ name, price, category })
      .then(() => {
        dispatch({ type: PLACE_CREATE });
        navigation.navigate('Home');
      });
  };
};
