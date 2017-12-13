/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import pure from 'recompose/pure';
import getContext from '../styles/createContext';

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

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);
  class WithRoot extends Component {
    static propTypes = {
      sheetsRegistry: PropTypes.object, // eslint-disable-line
    };
    componentWillMount() {
      this.styleContext = getContext();
    }
    componentDidMount() {
      // Do less at the start.
      setTimeout(() => {
        console.info('remove---------------');
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      }, 3000);
    }

    render() {
      const { sheetsRegistry, ...other } = this.props;
      return (
        <JssProvider registry={sheetsRegistry} jss={this.styleContext.jss}>
          <MuiThemeProvider
            theme={this.styleContext.theme}
            sheetsManager={this.styleContext.sheetsManager}
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
