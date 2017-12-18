/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AppBar from '../../components/MUI/app-bar';
import Mui from '../../components/mui';

function action({ styleContext }) {
  return {
    chunks: ['mui'],
    title: 'app-bar-api',
    component: <Mui sheetsRegistry={styleContext.sheetsRegistry} />,
  };
}

export default action;
