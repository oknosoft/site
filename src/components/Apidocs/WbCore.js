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
  return doc.children.length;
}
