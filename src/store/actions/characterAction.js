import {GET_CHARACTER_RESULTS, NO_CHARACTER_RESULTS} from './actionTypes';

export const CharactersAction = (page, name) => {
  return dispatch => {
    return fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
    )
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CHARACTER_RESULTS,
          characters: results.results,
          name,
          toNextPage: results.info.next,
          toPrevPage: results.info.prev,
          page,
          pageMax: results.info.pages,
          characterCount: results.info.count,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CHARACTER_RESULTS,
          name,
        });
      });
  };
};
