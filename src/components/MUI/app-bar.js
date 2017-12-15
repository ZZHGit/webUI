import React from 'react';
import MarkdownDocs from './MarkdownDocs';
import markdown from './app-barm.d';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default Page;
