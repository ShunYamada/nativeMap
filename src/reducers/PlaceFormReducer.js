import {
  PLACE_UPDATE,
  PLACE_CREATE,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  amount: '',
  category: '',
  latitude: '',
  longitude: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLACE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PLACE_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
