/**
 * Страница статьи
 *
 * @module Article
 *
 * Created by Evgeniy Malyarov on 17.04.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import IconContents from '@mui/icons-material/FormatListNumbered';

import MarkdownDocs from '../../packages/ui/Markdown/MarkdownDocs';
import NotFound from '../Pages/NotFound';  // 404
import Social from './Social';
import Loading from '../App/Loading';
//import Attachments from './Attachments';

function Article({title, handleIfaceState, handleNavigate}) {
  const [doc, setDoc] = React.useState(null);
  const {ref} = useParams();

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
  return <MarkdownDocs
    title={title}
    handleIfaceState={handleIfaceState}
    handleNavigate={handleNavigate}
    htitle={doc.name || 'без названия'}
    TopButton={contents && <IconButton
      onClick={() => handleNavigate(`/contents/${contents.id}`)}
      title="Перейти к оглавлению"
    >
      <IconContents />
    </IconButton>}
    h1={doc.h1}
    descr={doc.descr}
    /* canonical={match.path.replace(':ref', doc.id)} */
    img={doc.img || 'https://business-programming.ru/imgs/flask_192.png'}
    markdown={doc.content || 'текст отсутствует'}
    footer={ match.path.match(/\/(articles|files)\//) && [
      //<Attachments key="attachments" _obj={doc} handleIfaceState={handleIfaceState} />,
      <Social key="social" title={doc.name}/>,
    ]}
  />;
}


Article.propTypes = {
  handleIfaceState: PropTypes.func.isRequired,
};

export default Article;
