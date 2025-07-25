import React from 'react';
import MarkdownDocs from 'metadata-react/Markdown/MarkdownDocs';
import {useTitleContext} from '../App';
import markdown from './About.md';
import {description} from '../App/menu';

export default function Page(props) {
  const {setTitle} = useTitleContext();
  return <MarkdownDocs
    {...props}
    subtitle="Окнософт"
    markdown={markdown}
    descr={description}
    canonical="/about"
    setTitle={setTitle}
  />;
}
