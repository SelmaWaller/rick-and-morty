import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import App from './App';
import Overview from './pages/Overview';
import CharacterSpecific from './pages/CharacterSpecific';
import About from './pages/About';
import Contact from './pages/Contact';

import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import reducer from './store/reducers/combined-reducers';
import thunk from 'redux-thunk';

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), devToolsEnhancer())
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={Overview} />
          <Route
            path="/character-specific/:id"
            exact
            component={CharacterSpecific}
          />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
