// @flow

import React from 'react';
import MarkdownDocs from '../../packages/ui/Markdown/MarkdownDocs';
import markdown from './NotFound.md';
import {description} from '../App/menu';

export default function Page(props) {
  return <MarkdownDocs
    {...props}
    subtitle="Окнософт"
    markdown={markdown}
    descr={description}
  />;
}
