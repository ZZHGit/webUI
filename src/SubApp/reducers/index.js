import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui';
import todos from './todos';
// import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos,
  // visibilityFilter,
  ui: uiReducer,
});

export default todoApp;
