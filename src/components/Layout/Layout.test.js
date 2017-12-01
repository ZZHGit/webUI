/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import '@babel/polyfill';
import React from 'react';
import renderer from 'react-test-renderer';
// import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import configureStore from '../../store/configureStore';
// import thunk from 'redux-thunk';
import App from '../App';
import Layout from './Layout';
import createApolloClient from '../../core/createApolloClient';
import schema from '../../data/schema';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
const initialState = {
  runtime: {
    availableLocales: ['en-US'],
  },
  intl: {
    locale: 'en-US',
  },
};
const apolloClient = createApolloClient({
  schema,
  rootValue: {},
});

describe('Layout', () => {
  test('renders children correctly', () => {
    const store = configureStore(initialState, {
      apolloClient,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });
    const wrapper = renderer
      .create(
        <IntlProvider>
          <App context={{ insertCss: () => {}, store, client: apolloClient }}>
            <Layout>
              <div className="child" />
            </Layout>
          </App>
        </IntlProvider>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
