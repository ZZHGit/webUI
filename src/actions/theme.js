import { createAction } from 'redux-actions';

/* eslint-disable import/prefer-default-export */
import {
  THEME_CHANGE_PALETTE_TYPE,
  THEME_CHANGE_DIRECTION,
} from '../constants';

export const changePaletteType = createAction(
  THEME_CHANGE_PALETTE_TYPE,
  paletteType => ({
    paletteType: paletteType === 'light' ? 'dark' : 'light',
  }),
);
export const changeDirection = createAction(
  THEME_CHANGE_DIRECTION,
  direction => ({
    direction: direction === 'ltr' ? 'rtl' : 'ltr',
  }),
);

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
