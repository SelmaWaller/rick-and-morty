import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {HEROKU_BYPASS_CORS, RICK_AND_MORTY_API} from './../constants/constants';

import Characters from './../components/characters';

const CancelToken = axios.CancelToken;

export default class Overview extends Component {
  state = {
    cancelSource: CancelToken.source(),
    showData: undefined,
    searchPhrase: '',
    toNextPage: undefined,
    toPrevPage: undefined,
    page: 1,
    pageMax: undefined,
  };

  componentDidMount() {
    this.getCharacters(this.state.page, this.state.searchPhrase);
  }

  getCharacters(page, name) {
    axios
      .get(
        HEROKU_BYPASS_CORS +
          RICK_AND_MORTY_API +
          `?page=` +
          page +
          '&name=' +
          name,
        {
          cancelToken: this.state.cancelSource.token,
        }
      )
      .then(showResult => {
        this.setState({
          showData: showResult.data.results,
          toNextPage: showResult.data.info.next,
          toPrevPage: showResult.data.info.prev,
          pageMax: showResult.data.info.pages,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.state.cancelSource.cancel('Cancelled by unmount');
  }

  handleCharSearch = input => {
    this.setState({
      searchPhrase: input.target.value,
      page: 1,
    });
    this.getCharacters(1, input.target.value);
  };

  nextPage = () => {
    const nextPage = this.state.page + 1;
    this.setState({
      page: nextPage,
    });
    this.getCharacters(nextPage, this.state.searchPhrase);
  };

  prevPage = () => {
    const prevPage = this.state.page - 1;
    this.setState({
      page: prevPage,
    });
    this.getCharacters(prevPage, this.state.searchPhrase);
  };

  render() {
    const {page, pageMax, toNextPage, toPrevPage, showData} = this.state;
    const random = Math.floor(Math.random() * 493) + 1;

    return (
      <>
        <div className="wideCardContainer">
          <div className="innerCard postFilter">
            <div>
              <input
                type="text"
                placeholder={`E.g. "Rick"`}
                autoFocus
                onChange={this.handleCharSearch}
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
                onClick={this.prevPage}
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
                onClick={this.nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="smallCardContainer overview">
          {showData !== undefined ? (
            showData.map((value, index) => {
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
              <div className="cardShadow textLeft">
                <Characters
                  name="Character Name"
                  avatar="https://via.placeholder.com/500x500"
                />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
