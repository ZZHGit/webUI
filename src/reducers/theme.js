import { handleActions } from 'redux-actions';
import {
  // eslint-disable-next-line
  THEME_CHANGE_PALETTE_TYPE, THEME_CHANGE_DIRECTION,
} from '../constants';

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
      direction: action.payload.direction,
    }),
  },
  {},
);

export default theme;
