// @flow

import React from 'react';
import MarkdownDocs from 'metadata-react/Markdown/MarkdownDocs';
import markdown from './About.md';
import {description} from '../App/menu';

export default function Page(props) {
  return <MarkdownDocs
    {...props}
    subtitle="Окнософт"
    markdown={markdown}
    descr={description}
    canonical="/about"
  />;
}
