
import React from 'react';
import MarkdownDocs from 'metadata-ui/Markdown/MarkdownDocs';
import {useTitleContext} from '../App';
import markdown from './NotFound.md';
import {description} from '../App/menu';

export default function Page(props) {
  const {setTitle} = useTitleContext();
  return <MarkdownDocs
    {...props}
    htitle="Страница не найдена"
    subtitle="Окнософт"
    markdown={markdown}
    descr={description}
    setTitle={setTitle}
  />;
}
