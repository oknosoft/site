import React from 'react';
import Loading from '../App/Loading';
import NotFound from '../Pages/NotFound';  // 404
import {remoteHTML} from './remoteHTML';

const paths = {
  root: '/adm/apidocs/wbcore',
  path: '/apidocs/wbcore',
};

export default function WbCore() {

  const [doc, setDoc] = React.useState(null);
  remoteHTML({setDoc, ...paths});

  if(!doc) {
    return <Loading />;
  }
  if(doc instanceof Error) {
    return <NotFound  />;
  }

  const {styleSheets, scripts, links, body, head} = doc;
  const header = body.querySelector("header");
  return <div ref={(el) => {
    if(el) {
      while (el.children.length) {
        el.removeChild(el.children[0]);
      }
      for(const elm of Array.from(body.children)) {
        if(elm.tagName === 'DIV') {
          el.appendChild(elm);
        }
      }
    }
  }} />;
}
