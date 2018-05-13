import { combineReducers } from 'redux';
import PlaceFormReducer from './PlaceFormReducer';

export default combineReducers({
  placeForm: PlaceFormReducer,
});
