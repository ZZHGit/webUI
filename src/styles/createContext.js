/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-underscore-dangle */
import { SheetsRegistry } from 'react-jss/lib/jss';
import { create } from 'jss';
import { preset } from 'material-ui/styles/withStyles';
import rtl from 'jss-rtl';
import { createMuiTheme } from 'material-ui/styles';
import { blue, pink } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

export function getTheme(theme) {
  return createMuiTheme({
    direction: theme.direction,
    palette: {
      primary: blue,
      secondary: pink,
      type: theme.paletteType,
    },
  });
}

// Configure JSS
const jss = create({ plugins: [...preset().plugins, rtl()] });
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = 'insertion-point-jss';

export const sheetsManager = new Map();
export function createContext() {
  const sheetsRegistry = new SheetsRegistry();
  return {
    jss,
    theme: getTheme({
      direction: 'ltr',
      paletteType: 'light',
    }),
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry,
    generateClassName: jss.options.createGenerateClassName(),
  };
}

export default function getContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext();
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }
  return global.__INIT_MATERIAL_UI__;
}
