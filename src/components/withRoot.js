/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import pure from 'recompose/pure';
import { getContext } from '../styles/createContext';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = getContext();

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);
  class WithRoot extends Component {
    static propTypes = {
      sheetsRegistry: PropTypes.object, // eslint-disable-line
    };
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      const { sheetsRegistry, ...other } = this.props;
      return (
        <JssProvider registry={sheetsRegistry} jss={context.jss}>
          <MuiThemeProvider
            theme={context.theme}
            sheetsManager={context.sheetsManager}
          >
            <AppWrapper>
              <PureBaseComponent {...other} />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
