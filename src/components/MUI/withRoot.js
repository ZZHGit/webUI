/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import pure from 'recompose/pure';
import AppWrapper from './AppWrapper';

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);
  class WithRoot extends Component {
    static propTypes = {
      sheetsRegistry: PropTypes.object, // eslint-disable-line
    };

    render() {
      return (
        <AppWrapper>
          <PureBaseComponent {...this.props} />
        </AppWrapper>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
