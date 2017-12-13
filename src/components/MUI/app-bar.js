import React from 'react';
import withRoot from '../withRoot';
import MarkdownDocs from './MarkdownDocs';
import markdown from './app-bar.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
