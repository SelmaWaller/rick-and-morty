import {GET_CHARACTER_EPISODES, NO_CHARACTER_EPISODES} from './actionTypes';

export const CharacterEpisodeAction = episodeArray => {
  return dispatch => {
    return fetch(`https://rickandmortyapi.com/api/episode/${episodeArray}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CHARACTER_EPISODES,
          episodeArray,
          episodes: results,
        });
      });
  };
};
