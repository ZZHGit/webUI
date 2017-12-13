import { handleActions } from 'redux-actions';
import {
  THEME_CHANGE_PALETTE_TYPE,
  THEME_CHANGE_DIRECTION,
} from '../constants';
// https://redux-actions.js.org/docs/api/

const theme = handleActions(
  {
    THEME_CHANGE_PALETTE_TYPE: (state, action) => {
      const paletteType =
        action.payload.paletteType === 'light' ? 'dark' : 'light';
      return {
        ...state,
        paletteType,
      };
    },

    THEME_CHANGE_DIRECTION: (state, action) => ({
      ...state,
      direction: action.payload.locale,
    }),
  },
  {},
);

export default theme;
