import React from 'react';
import MarkdownDocs from './MarkdownDocs';
import markdown from './app-bar/app-bar.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/app-bar/SimpleAppBar.js': {
          js: require('./app-bar/SimpleAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/SimpleAppBar'), 'utf8')
`,
        },
        'pages/demos/app-bar/ButtonAppBar.js': {
          js: require('./app-bar/ButtonAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/ButtonAppBar'), 'utf8')
`,
        },
        'pages/demos/app-bar/MenuAppBar.js': {
          js: require('./app-bar/MenuAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/MenuAppBar'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
