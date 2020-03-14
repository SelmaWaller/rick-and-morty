import React, {Component} from 'react';
import axios from 'axios';

import {
  HEROKU_BYPASS_CORS,
  RICK_AND_MORTY_API,
  RICK_AND_MORTY_EPISODE_API,
} from '../constants/constants';
import Collapsible from 'react-collapsible';

import Episodes from './../components/episodes';
const CancelToken = axios.CancelToken;

export default class CharacterSpecific extends Component {
  state = {
    cancelSource: CancelToken.source(),
    showData: undefined,
    appearances: '',
    episodeData: undefined,
  };

  componentDidMount() {
    console.log('match', this.props.match);

    axios
      .get(
        HEROKU_BYPASS_CORS + RICK_AND_MORTY_API + this.props.match.params.id,
        {cancelToken: this.state.cancelSource.token}
      )
      .then(specificResult => {
        console.log(specificResult);
        this.setState({
          showData: specificResult.data,
          appearances: String(specificResult.data.episode)
            .split('https://rickandmortyapi.com/api/episode/')
            .join(''),
        });
        this.episodeNames(this.state.appearances);
        console.log(this.state.appearances);
      })
      .catch(err => {
        console.log(err);
      });
  }

  episodeNames = name => {
    axios
      .get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_EPISODE_API + name)
      .then(episodeResult => {
        console.log(episodeResult);
        this.setState({
          episodeData: episodeResult.data,
        });
        console.log(this.state.episodeData);
      });
  };

  componentWillUnmount() {
    this.state.cancelSource.cancel('Cancelled by unmount');
  }

  render() {
    const {showData, episodeData} = this.state;

    return (
      <div className="innerCard boxShadow textLeft charSpecific">
        {showData !== undefined ? (
          <>
            <img src={showData.image} alt={showData.name} />
            <h2>{showData.name}</h2>
            <p>
              Status: <span>{showData.status}</span>
            </p>
            <p>
              Species: <span>{showData.species}</span>
            </p>
            <p>
              Gender: <span>{showData.gender}</span>
            </p>
            <p>
              Origin: <span>{showData.origin.name}</span>
            </p>
            <p>
              Location: <span>{showData.location.name}</span>
            </p>
            <p>
              Created: <span>{showData.created}</span>
            </p>
          </>
        ) : (
          <>
            <div className="charSpecific">
              <img src="https://via.placeholder.com/300x300" alt="joblogo" />

              <h2>Waiting for data...</h2>
            </div>
          </>
        )}
        {episodeData !== undefined ? (
          <Collapsible trigger="Episode appearances">
            {episodeData.length > 1 ? (
              episodeData.map((value, index) => {
                return <Episodes key={index} episode={value.name} />;
              })
            ) : (
              <>
                <Episodes episode={episodeData.name} />
              </>
            )}
          </Collapsible>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
