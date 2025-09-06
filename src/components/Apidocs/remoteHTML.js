import React from 'react';
import { useLocation } from 'react-router';
import {useTitleContext} from '../App';

export function remoteHTML({setDoc, root, path}) {
  const {setTitle} = useTitleContext();
  const location = useLocation();
  let ref = location.pathname.replace(path, '');
  if(!ref || ref === '/') {
    ref = '/index.html';
  }

  React.useEffect(() => {
    // proxy к файлам api

    fetch(root + ref)
      .then(res => {
        if(res.ok) {
          return res.text();
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      })
      .then(raw => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(raw, 'text/html');
        const {head, body, title} = xmlDoc;

        let queue = Promise.resolve();
        for(const elm of head.children) {
          if(elm.tagName === 'LINK' && elm.rel === 'stylesheet') {
            const {value} = elm.attributes.href;
            if(!value.includes('://')) {
              queue = queue.then(() => $p.utils.load_script(`${root}/${value}`, 'link'));
            }
          }
        }

        queue.then(() => {
          const header = body.querySelector("header");

          setTitle({
            title: `Описание API ${xmlDoc.title}`,
            appTitle: <header dangerouslySetInnerHTML={{__html: header.innerHTML}} />
          });

          document.getElementsByTagName('main')?.[0]?.scrollIntoView();
          return setDoc(xmlDoc);
        });

      })
      .catch(err => setDoc(err));
  }, [ref]);

}
