/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import Home from './Home';
import Home from '../../components/MUI/index';

async function action({ styleContext }) {
  /* const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.'); */
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: <Home sheetsRegistry={styleContext.sheetsRegistry} />,
  };
}

export default action;
