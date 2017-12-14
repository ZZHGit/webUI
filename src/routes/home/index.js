/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from '../../components/MUI/index';
import AppFrame from '../../components/MUI/AppFrame';
// import Layout from '../../components/Layout';

/*
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
*/

async function action() {
  return {
    chunks: ['home'],
    title: 'Home',
    component: (
      <AppFrame>
        <Home />
      </AppFrame>
    ),
  };
}

export default action;
