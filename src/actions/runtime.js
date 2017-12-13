import { createAction } from 'redux-actions';

/* eslint-disable import/prefer-default-export */
import { SET_RUNTIME_VARIABLE } from '../constants';
// https://redux-actions.js.org/docs/api/
export const setRuntimeVariable = createAction(SET_RUNTIME_VARIABLE); // ({ name, value })

/*
export function setRuntimeVariable({ name, value }) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
} 
*/
