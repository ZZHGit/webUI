/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-underscore-dangle */
import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from 'material-ui/styles';
import { blue, green } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

export function getTheme(theme) {
  return createMuiTheme({
    direction: theme.direction,
    palette: {
      primary: blue,
      secondary: green,
      type: theme.paletteType,
    },
  });
}
const theme = getTheme({
  // direction: 'ltr',
  paletteType: 'light',
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: jss.options.createGenerateClassName(),
  };
}

export function getContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext();
  }

  // Reuse context on the client-side
  if (!window.App.stlye) {
    window.App.stlye = createContext();
  }

  return window.App.stlye;
}
