import React from 'react';
import MarkdownDocs from './MarkdownDocs';
import markdown from './app-bar.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default Page;
