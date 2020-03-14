import React, {Component} from 'react';
import axios from 'axios';

import {HEROKU_BYPASS_CORS, RICK_AND_MORTY_API} from './../constants/constants';

import Characters from './../components/characters';

const CancelToken = axios.CancelToken;

export default class Overview extends Component {
  state = {
    cancelSource: CancelToken.source(),
    showData: undefined,
    filteredResults: [],
    isFiltered: false,
    searchPhrase: '',
  };

  componentDidMount() {
    axios
      .get(HEROKU_BYPASS_CORS + RICK_AND_MORTY_API + '?page=24', {
        cancelToken: this.state.cancelSource.token,
      })
      .then(showResult => {
        this.setState({
          showData: showResult.data.results,
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
    const {showData} = this.state;
    let charResults = showData.filter(value => {
      return value.name
        .toLowerCase()
        .includes(input.target.value.toLowerCase());
    });
    this.setState({
      filteredResults: charResults,
      searchPhrase: input.target.value,
      isFiltered: true,
    });
  };

  render() {
    const {showData, isFiltered, filteredResults} = this.state;

    return (
      <>
        <div className="wideCardContainer">
          <div className="innerCard postFilter">
            <form>
              <span role="img" aria-label="magnifying-glass">
                &nbsp; 🔍{' '}
              </span>
              <input
                id="filterPosts"
                type="text"
                name="filterPosts"
                placeholder="Search for a character"
                onChange={this.handleCharSearch}
              />
            </form>
          </div>
        </div>

        <div className="mediumCardContainer">
          {isFiltered ? (
            <>
              {filteredResults.length > 0 ? (
                filteredResults.map((value, index) => {
                  return (
                    <div className="filteredChars" key={index}>
                      <Characters
                        key={value.index}
                        name={value.name}
                        avatar={value.image}
                        id={value.id}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="innerCard boxShadow filteredChars textLeft">
                  <h3>No results! Try again later</h3>
                </div>
              )}
            </>
          ) : (
            <>
              {showData !== undefined ? (
                showData.slice(0, 20).map((value, index) => {
                  return (
                    <div key={index}>
                      <Characters
                        key={value.index}
                        name={value.name}
                        avatar={value.image}
                        id={value.id}
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="filteredChars textLeft blogPosts">
                    <Characters
                      name="Character Name"
                      avatar="https://via.placeholder.com/500x500"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}
