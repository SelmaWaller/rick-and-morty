import {
  GET_CHARACTER_RESULTS,
  NO_CHARACTER_RESULTS,
} from './../actions/actionTypes';

const initialState = [];

const CharacterSpecificReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTER_RESULTS:
      return {
        ...state,
        ...action,
      };
    case NO_CHARACTER_RESULTS:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export default CharacterSpecificReducer;
