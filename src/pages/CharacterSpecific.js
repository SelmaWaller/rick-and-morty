import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
    currentPage: undefined,
  };

  componentDidMount() {
    axios.get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_API).then(countResult => {
      this.setState({
        characterCount: countResult.data.info.count,
      });
    });
    axios
      .get(
        HEROKU_BYPASS_CORS + RICK_AND_MORTY_API + this.props.match.params.id,
        {cancelToken: this.state.cancelSource.token}
      )
      .then(specificResult => {
        this.setState({
          showData: specificResult.data,
          appearances: String(specificResult.data.episode)
            .split('https://rickandmortyapi.com/api/episode/')
            .join(''),
        });
        this.episodeNames(this.state.appearances);
      })
      .catch(err => {
        console.log(err);
      });
  }

  episodeNames = name => {
    axios
      .get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_EPISODE_API + name, {
        cancelToken: this.state.cancelSource.token,
      })
      .then(episodeResult => {
        this.setState({
          episodeData: episodeResult.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this.state.cancelSource.cancel('Cancelled by unmount');
  }

  render() {
    const {showData, episodeData, characterCount} = this.state;
    let charId = this.props.match.params.id;
    const next = charId++ + 1;
    const prev = charId-- - 2;
    let nextChar = () => {
      charId <= characterCount - 1
        ? (window.location = `/character-specific/${next}`)
        : window.location.reload();
    };
    let prevChar = () => {
      charId >= 2
        ? (window.location = `/character-specific/${prev}`)
        : window.location.reload();
    };

    return (
      <div className="charSpecific">
        <div className="postFilter">
          <div>
            <Link to={`/character-specific/${prev}`}>
              <button
                disabled={charId === 1 ? true : false}
                className={charId >= 1 ? 'prevChar' : 'prevChar__hide'}
                onClick={prevChar}
              >
                Prev
              </button>
            </Link>
          </div>
          <button className="currentPage">
            {charId} of {characterCount}
          </button>
          <div>
            <Link to={`/character-specific/${next}`}>
              <button
                disabled={charId <= characterCount - 1 ? false : true}
                className={
                  charId <= characterCount ? 'nextChar' : 'nextChar__hide'
                }
                onClick={prevChar}
                onClick={nextChar}
              >
                Next
              </button>
            </Link>
          </div>
        </div>
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
      </div>
    );
  }
}
