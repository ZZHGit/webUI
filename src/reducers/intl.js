import { handleActions } from 'redux-actions';
import {
  // eslint-disable-next-line
  SET_LOCALE_START, // eslint-disable-next-line
  SET_LOCALE_SUCCESS, // eslint-disable-next-line
  SET_LOCALE_ERROR, // eslint-disable-next-line
} from '../constants';

const intl = handleActions(
  {
    SET_LOCALE_START: (state, action) => {
      const locale = state[action.payload.locale]
        ? action.payload.locale
        : state.locale;
      return {
        ...state,
        locale,
        newLocale: action.payload.locale,
      };
    },

    SET_LOCALE_SUCCESS: (state, action) => ({
      ...state,
      locale: action.payload.locale,
      newLocale: null,
      messages: {
        ...state.messages,
        [action.payload.locale]: action.payload.messages,
      },
    }),

    SET_LOCALE_ERROR: state => ({
      ...state,
      newLocale: null,
    }),
  },
  {
    // This stabilizes the "current time" for the initial
    // rendering of the app, which affects relative time formatting.
    initialNow: Date.now(),
  },
);

export default intl;
