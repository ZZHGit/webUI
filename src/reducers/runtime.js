import { handleAction } from 'redux-actions';
import { SET_RUNTIME_VARIABLE } from '../constants';
// https://redux-actions.js.org/docs/api/
const runtime = handleAction(
  SET_RUNTIME_VARIABLE,
  (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),
  {}, // defaultState
);

export default runtime;
/*
export default function runtime(state = {}, action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}  */
