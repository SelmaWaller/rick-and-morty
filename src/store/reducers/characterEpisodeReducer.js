import {
  GET_CHARACTER_EPISODES,
  NO_CHARACTER_EPISODES,
} from './../actions/actionTypes';

const initialState = [];

const CharacterEpisodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTER_EPISODES:
      return {
        ...state,
        ...action,
      };
    case NO_CHARACTER_EPISODES:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export default CharacterEpisodeReducer;
