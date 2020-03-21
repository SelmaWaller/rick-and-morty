import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';

import {CharactersAction} from './../store/actions/characterAction';
import {CharacterCountAction} from './../store/actions/characterCountAction';
import {DebouncerAction} from './../store/actions/debouncerAction';
import Characters from './../components/characters';

function Overview() {
  const dispatch = useDispatch();

  const debouncer = useSelector(state => state.DebouncerReducer.debouncer);
  const characterCount = useSelector(
    state => state.CharacterCountReducer.characterCount
  );

  const {characters, name, page, toNextPage, toPrevPage, pageMax} = useSelector(
    state => state.CharactersReducer
  );

  useEffect(() => {
    dispatch(DebouncerAction(debouncer));
    dispatch(CharactersAction(1, ''));
    dispatch(CharacterCountAction());
  }, [debouncer, dispatch]);

  let handleCharSearch = input => {
    if (debouncer) {
      clearTimeout(debouncer);
    }
    const value = input.target.value;
    const bounce = setTimeout(() => dispatch(CharactersAction(1, value)), 300);
    dispatch(DebouncerAction(bounce));
  };

  let nextPage = () => {
    dispatch(CharactersAction(page + 1, name));
  };

  let prevPage = () => {
    dispatch(CharactersAction(page - 1, name));
  };

  const random = Math.floor(Math.random() * characterCount) + 1;

  return (
    <>
      <div className="wideCardContainer">
        <div className="innerCard postFilter">
          <div>
            <input
              type="text"
              placeholder={`Ex: "Poopybutthole"`}
              autoFocus
              onChange={handleCharSearch}
            />
          </div>
          <Link to={`/character-specific/${random}`}>
            <button className="activeButton">
              <span>Get a random character</span>
            </button>
          </Link>
          <div className="pages">
            <button
              className={
                toPrevPage !== '' ? 'activeButton' : 'activeButton__hide'
              }
              disabled={toPrevPage !== '' ? false : true}
              onClick={prevPage}
            >
              Prev
            </button>

            <button className="currentPage">
              {page} of {pageMax}
            </button>
            <button
              className={
                toNextPage !== '' ? 'activeButton' : 'activeButton__hide'
              }
              disabled={toNextPage !== '' ? false : true}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="smallCardContainer overview">
        {characters ? (
          characters.map((value, index) => {
            return (
              <div key={index}>
                <Characters
                  key={index}
                  name={value.name}
                  avatar={value.image}
                  id={value.id}
                />
              </div>
            );
          })
        ) : (
          <>
            <ReactLoading
              type={'spinningBubbles'}
              color={'#51a9b6a1'}
              height={100}
              width={100}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Overview;
