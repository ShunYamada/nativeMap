import { combineReducers } from 'redux';
import PlaceFormReducer from './PlaceFormReducer';
import PlaceReducer from './PlaceReducer';

export default combineReducers({
  placeForm: PlaceFormReducer,
  places: PlaceReducer
});
