/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import getctx, { getTheme } from '../../styles/createContext';

import AppFrame from './AppFrame';
import { lightTheme, darkTheme, setPrismTheme } from './utils/prism';

// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    uiTheme: PropTypes.object.isRequired, // eslint-disable-line
    sheetsRegistry: PropTypes.object.isRequired, // eslint-disable-line
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    styleContext: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.styleContext = getctx();
  }

  componentDidMount() {
    // Do less at the start.
    setTimeout(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }, 3000);

    if (this.props.uiTheme.paletteType === 'light') {
      setPrismTheme(lightTheme);
    } else {
      setPrismTheme(darkTheme);
    }

    if (document.body) {
      document.body.dir = this.props.uiTheme.direction;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uiTheme.paletteType !== this.props.uiTheme.paletteType ||
      nextProps.uiTheme.direction !== this.props.uiTheme.direction
    ) {
      this.styleContext.theme = getTheme(nextProps.uiTheme);
      if (nextProps.uiTheme.paletteType === 'light') {
        setPrismTheme(lightTheme);
      } else {
        setPrismTheme(darkTheme);
      }

      if (document.body) {
        document.body.dir = nextProps.uiTheme.direction;
      }
    }
  }

  styleContext = null;

  render() {
    const { children, sheetsRegistry } = this.props;
    const disablePermanent =
      this.context.history != null &&
      this.context.history.location.pathname === '/';
    return (
      <JssProvider
        registry={sheetsRegistry}
        jss={this.styleContext.jss}
        generateClassName={this.styleContext.generateClassName}
      >
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppFrame disablePermanent={disablePermanent}>{children}</AppFrame>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default connect(state => ({
  uiTheme: state.theme,
}))(AppWrapper);
