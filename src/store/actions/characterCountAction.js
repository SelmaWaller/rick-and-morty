import {GET_CHARACTER_RESULTS} from './actionTypes';

export const CharacterCountAction = () => {
  return dispatch => {
    return fetch(`https://rickandmortyapi.com/api/character/`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CHARACTER_RESULTS,
          characterCount: results.info.count,
        });
      });
  };
};
