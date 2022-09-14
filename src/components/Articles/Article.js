/**
 * Страница статьи
 *
 * @module Article
 *
 * Created by Evgeniy Malyarov on 17.04.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import IconContents from '@mui/icons-material/FormatListNumbered';

import MarkdownDocs from '../../packages/ui/Markdown/MarkdownDocs';
import NotFound from '../Pages/NotFound';  // 404
import Social from './Social';
import Loading from '../App/Loading';
//import Attachments from './Attachments';

const cprefix = '/couchdb/www_0_ram/cat.articles|';

function Article({title, handleIfaceState, handleNavigate}) {
  const [doc, setDoc] = React.useState(null);
  const ref = location.pathname;

  React.useEffect(() => {
    const {articles} = $p.cat;
    const tmp = articles.by_id(ref);
    if(!tmp.empty()) {
      return setDoc(tmp);
    }
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    fetch(ref, {method: 'POST', headers})
      .then(res => res.json())
      .then(raw => {
        if(raw.error && raw.message) {
          throw new Error(raw.message);
        }
        articles.load_array([raw]);
        return setDoc(articles.get(raw.ref));
      })
      .catch(err => setDoc(err));
  }, [ref]);

  if(!doc) {
    return <Loading />;
  }
  if(doc === 404 || doc instanceof Error) {
    return <NotFound title={title} handleIfaceState={handleIfaceState} handleNavigate={handleNavigate} />;
  }
  const mprops = {
    title,
    htitle: doc.name || 'без названия',
    handleIfaceState,
    handleNavigate,
    h1: doc.h1,
    descr: doc.descr,
    img: doc.img || '/imgs/flask_192.png',
    markdown: (doc.content || 'текст отсутствует')
      .replace(/\!\[image\]\(this/gm, `![image](${cprefix}${doc.ref}`)
      .replace(/src="this\//gm, `src="${cprefix}${doc.ref}/`),
  };
  if(ref !== `/${doc.id}`) {
    mprops.canonical = location.href.replace(ref, `/${doc.id}`);
  }
  if(!ref) {
    mprops.TopButton = <IconButton
      onClick={() => handleNavigate(doc.id)}
      title="Перейти к оглавлению"
    >
      <IconContents />
    </IconButton>;
  }
  if(doc.category.att_allowed) {
    mprops.footer = <>
      {/*<Attachments key="attachments" _obj={doc} handleIfaceState={handleIfaceState} />*/}
      <Social key="social" title={doc.name}/>
    </>;
  }

  return <MarkdownDocs {...mprops}/>;
}


Article.propTypes = {
  handleIfaceState: PropTypes.func.isRequired,
};

export default Article;
