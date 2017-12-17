/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import { IntlProvider } from 'react-intl';

import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
} from '../constants';

import queryIntl from './intl.graphql';

function getIntlFromState(state) {
  const intl = (state && state.intl) || {};
  const { initialNow, locale, messages } = intl;
  const localeMessages = (messages && messages[locale]) || {};
  const provider = new IntlProvider({
    initialNow,
    locale,
    messages: localeMessages,
    defaultLocale: 'zh-CN',
  });
  return provider.getChildContext().intl;
}

export function getIntl() {
  return (dispatch, getState) => getIntlFromState(getState());
}

export function setLocale({ locale }) {
  // 使用额外注入的参数
  return async (dispatch, getState, { client, history }) => {
    dispatch(createAction(SET_LOCALE_START)(locale));
    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.networkInterface.query({
        query: queryIntl,
        variables: {
          locale,
        },
      });

      const messages = data.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});

      dispatch(createAction(SET_LOCALE_SUCCESS)({ locale, messages }));

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
        history.push(`?lang=${locale}`);
        // window.RSK_ENTRY();
      }

      // return bound intl instance at the end
      return getIntlFromState(getState());
    } catch (error) {
      dispatch(createAction(SET_LOCALE_ERROR)({ locale, error }));
      return null;
    }
  };
}
