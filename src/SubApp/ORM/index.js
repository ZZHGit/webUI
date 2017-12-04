import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createReducer } from 'redux-orm';

import { orm } from './models';
import selectedUserIdReducer from './reducers';
import bootstrap from './bootstrap';
import App from './app';

const rootReducer = combineReducers({
  orm: createReducer(orm),
  selectedUserId: selectedUserIdReducer,
});

const store = createStore(
  rootReducer,
  bootstrap(orm),
  applyMiddleware(createLogger()),
);

class SubApp extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default SubApp;
