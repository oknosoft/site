// @flow

import React from 'react';
import MarkdownDocs from '../../packages/ui/Markdown/MarkdownDocs';
import markdown from './NotFound.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} subtitle="Окнософт" />;
}
