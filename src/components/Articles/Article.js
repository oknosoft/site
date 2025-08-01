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
import { useLocation } from 'react-router';

import MarkdownDocs from 'metadata-ui/Markdown/MarkdownDocs';
import NotFound from '../Pages/NotFound';  // 404
import Social from './Social';
import Loading from '../App/Loading';
import Footer from '../Home/Footer';
import {useTitleContext} from '../App';
const Attachments = React.lazy(() => import('./Attachments'));
const Contents = React.lazy(() => import('./Contents'));
const ImgList = React.lazy(() => import('./ImgList'));
const ImgCarousel = React.lazy(() => import('./ImgCarousel'));
const components = {Footer, Contents, ImgList, ImgCarousel};

const cprefix = '/couchdb/www_0_ram/cat.articles|';

const handleIfaceState = (...attr) => console.log(...attr);

function Article({title}) {
  const {setTitle} = useTitleContext();
  const [doc, setDoc] = React.useState(null);
  const location = useLocation();
  const ref = location.pathname;

  React.useEffect(() => {
    const {articles} = $p.cat;
    const tmp = articles.by_id(ref);
    if(!tmp.empty()) {
      return setDoc(tmp);
    }
    // если не нашли статью в памяти браузера, ищем на сервере
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    fetch(ref, {method: 'POST', headers})
      .then(res => res.json())
      .then(raw => {
        if(raw.error && raw.message) {
          throw new Error(raw.message);
        }
        articles.load_array([raw]);
        document.getElementsByTagName('main')?.[0]?.scrollIntoView();
        return setDoc(articles.get(raw.ref));
      })
      .catch(err => setDoc(err));
  }, [ref]);

  if(!doc) {
    return <Loading />;
  }
  if(doc === 404 || doc instanceof Error) {
    return <NotFound title={title}  />;
  }
  const mprops = {
    title,
    htitle: doc.name || 'без названия',
    handleIfaceState,
    h1: doc.h1,
    descr: doc.descr,
    img: doc.img ? doc.img.replace('~/', `${cprefix}${doc.ref}/`) : '/imgs/flask_192.png',
    markdown: (doc.content || 'текст отсутствует')
      .replace(/(?<=<ssr>)[\s\S]+?(?=<\/ssr>)/gm, '')
      .replace(/\!\[image\]\(this/gm, `![image](${cprefix}${doc.ref}`)
      .replace(/src="this\//gm, `src="${cprefix}${doc.ref}/`)
      .replace(/~\//gm, `${cprefix}${doc.ref}/`)
      .replace(/(<ssr><\/ssr>)/g, ''),
    footer: [],
    setTitle,
    components,
  };
  if(doc.footer) {
    mprops.sx = {minHeight: 'calc(100vh - 220px)', mb: 2};
  }

  // if(ref !== `/${doc.id}`) {
  //   mprops.canonical = location.href.replace(ref, `/${doc.id}`);
  // }

  // if(!ref) {
  //   mprops.TopButton = <IconButton
  //     onClick={() => handleNavigate(doc.id)}
  //     title="Перейти к оглавлению"
  //   >
  //     <IconContents />
  //   </IconButton>;
  // }

  if(doc.category.is('contents')) {
    mprops.markdown += `\n{<Contents docRef="${doc.ref}"/>}\n`;
  }
  if(doc.category.is('file')) {
    mprops.footer.push(
      <React.Suspense key="attachments" fallback="Загрузка...">
        <Attachments _obj={doc} handleIfaceState={handleIfaceState} />
      </React.Suspense>);
  }
  if(doc.social) {
    mprops.footer.push(<Social key="social" title={doc.name}/>);
  }

  const main = <MarkdownDocs {...mprops}/>;
  return doc.footer ? <>
    {main}
    <Footer/>
  </> : main;
}


Article.propTypes = {
  handleIfaceState: PropTypes.func.isRequired,
};

export default Article;
