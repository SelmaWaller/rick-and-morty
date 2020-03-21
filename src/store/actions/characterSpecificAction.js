import {GET_CHARACTER_RESULTS, NO_CHARACTER_RESULTS} from './actionTypes';

export const CharacterSpecificAction = specificId => {
  return dispatch => {
    return fetch(`https://rickandmortyapi.com/api/character/${specificId}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CHARACTER_RESULTS,
          specificId,
          character: results,
          charName: results.name,
          charStatus: results.status,
          episodeArray: String(results.episode)
            .split('https://rickandmortyapi.com/api/episode/')
            .join(''),
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CHARACTER_RESULTS,
        });
      });
  };
};
