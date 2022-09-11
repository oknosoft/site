import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MarkdownElement from './MarkdownElement';
import {getContents, getTitle} from './parseMarkdown';

export function MarkdownDocs(props) {
  const {classes, markdown, subtitle, title, htitle, h1, img,
    descr, canonical, footer, handleIfaceState, handleNavigate, TopButton} = props;
  const contents = getContents(markdown);

  const ltitle = htitle || `${getTitle(markdown)}${subtitle ? ' - ' + subtitle : ''}`;
  if (title != ltitle) {
    handleIfaceState({
      component: '',
      name: 'title',
      value: ltitle,
    });
  }

  return (
    <Box mb={100}>
      <Helmet title={ltitle}>
        <meta name="description" content={descr || h1} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content={ltitle} />
        <meta property="og:description" content={descr || h1} />
        {img && <meta property="og:image" content={img} />}
      </Helmet>

      {
        h1 && <Box sx={{display: 'flex'}}>
          <Typography key="h1" variant="h4" component="h1" color="primary" sx={{width: '100%'}}>{h1}</Typography>
          {TopButton}
        </Box>
      }

      {contents.map(content => <MarkdownElement
        key={content}
        title={title}
        handleNavigate={handleNavigate}
        handleIfaceState={handleIfaceState}
        text={content}/>)
      }

      {
        footer
      }
    </Box>
  );
}

MarkdownDocs.propTypes = {
  markdown: PropTypes.string.isRequired,
  title: PropTypes.string,              // заголовок в табе браузера
  subtitle: PropTypes.string,           // суффикс проекта в заголовке
  h1: PropTypes.string,                 // заголовок статьи
  descr: PropTypes.string,              // html meta description
  footer: PropTypes.node,               // кнопки share соцсетей, прочие элементы в подвале
}

export default MarkdownDocs;
