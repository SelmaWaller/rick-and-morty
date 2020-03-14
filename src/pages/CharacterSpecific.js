import React, {Component} from 'react';
import axios from 'axios';

import {HEROKU_BYPASS_CORS, RICK_AND_MORTY_API} from '../constants/constants';
import Collapsible from 'react-collapsible';

const CancelToken = axios.CancelToken;

export default class CharacterSpecific extends Component {
  state = {
    cancelSource: CancelToken.source(),
    showData: undefined,
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
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.state.cancelSource.cancel('Cancelled by unmount');
  }

  render() {
    const {showData} = this.state;

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
            <Collapsible trigger="Episode appearances">
              <p>
                {String(showData.episode)
                  .split('https://rickandmortyapi.com/api/episode/')
                  .join(' ')}
              </p>
            </Collapsible>
          </>
        ) : (
          <>
            <div className="charSpecific">
              <img src="https://via.placeholder.com/300x300" alt="joblogo" />

              <h2>Waiting for data...</h2>
            </div>
          </>
        )}
      </div>
    );
  }
}
