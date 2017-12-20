/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import Mui from '../../components/Mui/Demo';
import Page from '../../components/Mui/Pages';

function action() {
  return {
    chunks: ['mui'],
    title: 'app-bar-api',
    component: <Page />,
  };
}

export default action;
