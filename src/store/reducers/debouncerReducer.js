import {GET_DEBOUNCER} from './../actions/actionTypes';

const initialState = [];

const DebouncerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEBOUNCER:
      return {
        ...state,
        debouncer: action.debouncer,
      };
    default:
      return state;
  }
};

export default DebouncerReducer;
