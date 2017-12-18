import React from 'react';
import MarkdownDocs from './MarkdownDocs';
import markdown from './app-bar.md';
import withRoot from './withRoot';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
