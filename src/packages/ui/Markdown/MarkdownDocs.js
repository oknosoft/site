import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {styled, useTheme} from '@mui/material/styles';
import Typography from '@material-ui/core/Typography';

import MarkdownElement from './MarkdownElement';
import {getContents, getTitle} from './parseMarkdown';

export const styles = {
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
  },
  width: {
    width: '100%',
  }
};

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
    <div className={classes.root}>
      <Helmet title={ltitle}>
        <meta name="description" content={descr || h1} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content={ltitle} />
        <meta property="og:description" content={descr || h1} />
        {img && <meta property="og:image" content={img} />}
      </Helmet>

      {
        h1 && <div className={classes.header}>
          <Typography key="h1" variant="h4" component="h1" color="primary" className={classes.width}>{h1}</Typography>
          {TopButton}
        </div>
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

    </div>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  markdown: PropTypes.string.isRequired,
  title: PropTypes.string,              // заголовок в табе браузера
  subtitle: PropTypes.string,           // суффикс проекта в заголовке
  h1: PropTypes.string,                 // заголовок статьи
  descr: PropTypes.string,              // html meta description
  footer: PropTypes.node,               // кнопки share соцсетей, прочие элементы в подвале
}

export default styled(styles)(MarkdownDocs);
