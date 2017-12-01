import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import intl from './intl';
import todos from './todo/todos';
import visibilityFilter from './todo/visibilityFilter';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    runtime,
    intl,
    todos,
    visibilityFilter,
  });
}
