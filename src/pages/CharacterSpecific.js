import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {
  HEROKU_BYPASS_CORS,
  RICK_AND_MORTY_API,
  RICK_AND_MORTY_EPISODE_API,
} from '../constants/constants';

import ReactLoading from 'react-loading';
import Collapsible from 'react-collapsible';

export default function CharacterSpecific({
  match: {
    params: {id},
  },
}) {
  const [characterCount, setCharacterCount] = useState(undefined);
  const [characters, setCharacters] = useState(undefined);
  const [episode, setEpisode] = useState(undefined);

  let charId = id;
  let next = charId++ + 1;
  let prev = charId-- - 2;

  useEffect(() => {
    axios
      .get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_API)
      .then(countResult => {
        setCharacterCount(countResult.data.info.count);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_API + charId)
      .then(specificResult => {
        setCharacters(specificResult.data);
        episodeNames(
          String(specificResult.data.episode)
            .split('https://rickandmortyapi.com/api/episode/')
            .join('')
        ); //filter appearances to episode api
      })
      .catch(err => {
        console.log(err);
      });
  }, [charId]);

  let episodeNames = name => {
    axios
      .get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_EPISODE_API + name)
      .then(episodeResult => {
        setEpisode(episodeResult.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
              onClick={nextChar}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
      <div className="innerCard boxShadow textLeft charSpecific">
        {characters !== undefined ? (
          <>
            <img src={characters.image} alt={characters.name} />
            <h2>{characters.name}</h2>
            <p>
              Status: <span>{characters.status}</span>
            </p>
            <p>
              Species: <span>{characters.species}</span>
            </p>
            <p>
              Gender: <span>{characters.gender}</span>
            </p>
            <p>
              Origin: <span>{characters.origin.name}</span>
            </p>
            <p>
              Location: <span>{characters.location.name}</span>
            </p>
            <p>
              Created: <span>{characters.created}</span>
            </p>
          </>
        ) : (
          <>
            <div className="loading">
              <ReactLoading
                type={'spinningBubbles'}
                color={'#51a9b6a1'}
                height={140}
                width={140}
              />
            </div>
            <h2>Waiting for data...</h2>
            <p>
              Status: <span>Unknown</span>
            </p>
            <p>
              Species: <span>Unknown</span>
            </p>
            <p>
              Gender: <span>Unknown</span>
            </p>
            <p>
              Origin: <span>Unknown</span>
            </p>
            <p>
              Location: <span>Unknown</span>
            </p>
            <p>
              Created: <span>Unknown</span>
            </p>
            <Collapsible trigger="Episode appearances"></Collapsible>
          </>
        )}
        {episode !== undefined ? (
          <Collapsible trigger="Episode appearances">
            {episode.length > 1 ? (
              episode.map((value, index) => {
                return <p key={index}>{value.name}</p>;
              })
            ) : (
              <>
                <p>{episode.name}</p>
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
