import {
  GET_CHARACTER_RESULTS,
  NO_CHARACTER_RESULTS,
} from './../actions/actionTypes';

const initialState = [];

const CharactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTER_RESULTS:
      return {
        ...state,
        ...action,
      };
    case NO_CHARACTER_RESULTS:
      return {
        ...state,
        characters: [],
        page: 1,
        pageMax: 1,
        toNextPage: '',
        toPrevPage: '',
      };
    default:
      return state;
  }
};

export default CharactersReducer;
