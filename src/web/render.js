import React from "react";
import {hydrate} from "react-dom";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {ApolloProvider} from 'react-apollo';

import ApolloClient from "apollo-boost";
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';

export const render = ({
  App,
  watchers,
  reducers,
  urls: {
    graphql,
    events
  }
}) => {

  const {store, history} = configureStore({reducers, initState: window.__PRELOADED_STATE__});
  const client = configureGraph({url, initState: window.__APOLLO_STATE__});

  const AppRoot = () => {
    return (<ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>)
  };

  hydrate(<AppRoot/>, document.getElementById("root"));

}

const configureGraph = ({
  url,
  initState
}) => {

  const cache = new InMemoryCache();
  return new ApolloClient({
    cache,
    link: new HttpLink({ uri: url })
  });
}



const configureStore = ({reducers, initialState}) => {

  const history = createHistory();

  // Allow the passed state to be garbage-collected
  //delete window.__PRELOADED_STATE__;
  const store = createStore(
  /***/
  combineReducers({routing: routerReducer, app: reducers}), initialState,
  /**/
  compose(
    applyMiddleware(routerMiddleware(history)),
    /**/
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined')
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f));

  return {store, history};
};
