import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {CharacterCountAction} from './../store/actions/characterCountAction';
import {CharacterSpecificAction} from './../store/actions/characterSpecificAction';
import {CharacterEpisodeAction} from './../store/actions/characterEpisodeAction';

import ReactLoading from 'react-loading';
import Collapsible from 'react-collapsible';

export default function CharacterSpecific({
  match: {
    params: {id},
  },
}) {
  const dispatch = useDispatch();

  const characterCount = useSelector(
    state => state.CharacterCountReducer.characterCount
  );

  const {
    specificId,
    character,
    charName,
    charStatus,
    episodeArray,
  } = useSelector(state => state.CharacterSpecificReducer);

  const {episodes} = useSelector(state => state.CharacterEpisodeReducer);

  let charId = id;
  let next = charId++ + 1;
  let prev = charId-- - 2;

  useEffect(() => {
    dispatch(CharacterCountAction());
    dispatch(CharacterSpecificAction(charId));
    if (episodeArray) {
      dispatch(CharacterEpisodeAction(episodeArray));
    }
  }, [specificId, charId, episodeArray, dispatch]);

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
          {charId} of {characterCount ? characterCount : 493}{' '}
          {/* temporary solution */}
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
        {character !== undefined ? (
          <>
            <img src={character.image} alt={charName} />
            <h2>{charName}</h2>
            <p>
              Status: <span>{charStatus}</span>
            </p>
            <p>
              Species: <span>{character.species}</span>
            </p>
            <p>
              Gender: <span>{character.gender}</span>
            </p>
            <p>
              Origin: <span>{character.origin.name}</span>
            </p>
            <p>
              Location: <span>{character.location.name}</span>
            </p>
            <p>
              Created: <span>{character.created}</span>
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
        {episodes ? (
          <Collapsible trigger="Episode appearances">
            {episodes.length > 1 ? (
              episodes.map((value, index) => {
                return <p key={index}>{value.name}</p>;
              })
            ) : (
              <>
                <p>{episodes.name}</p>
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
