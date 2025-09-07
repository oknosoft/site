import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import {useTitleContext} from '../App';

export function remoteHTML({setDoc, root, path}) {
  const {setTitle} = useTitleContext();
  const location = useLocation();
  const rawNavigate = useNavigate();
  const navigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    rawNavigate(e.currentTarget.attributes.href.value);
  };
  const ref = location.pathname.replace(path, '');

  React.useEffect(() => {
    // proxy к файлам api

    fetch(`${root}${ref}`)
      .then(res => {
        if(res.ok) {
          return res.text();
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      })
      .then(raw => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(raw.replace('<head>',
          `<head>\n<base href="${root}/">`), 'text/html');
        const {head, body, title} = xmlDoc;

        let queue = Promise.resolve();
        for(const elm of xmlDoc.querySelectorAll('a')) {
          let {value} = elm.attributes.href;
          if(value.endsWith('.html')) {
            value = value.replace('.html', '');
          }
          if(value.endsWith('index')) {
            value = value.replace('index', '');
          }
          if(!value.startsWith('/')) {
            elm.href = value ? `${path}/${value}` : path;
          }
          elm.onclick = navigate;
        }
        for(const elm of head.children) {
          if(elm.tagName === 'LINK' && elm.rel === 'stylesheet') {
            const {value} = elm.attributes.href;
            if(!value.includes('://')) {
              queue = queue.then(() => $p.utils.loadScript(elm.href, 'link'));
            }
          }
        }

        //document.getElementsByTagName('main')?.[0]?.scrollIntoView();
        return queue.then(() => xmlDoc);

      })
      .then((xmlDoc) => {
        const {body, title} = xmlDoc;
        const header = body.querySelector("header");

        setTitle({
          title: `Описание API ${xmlDoc.title}`,
          appTitle: <div ref={(el) => {
            if(el && !el.children.length) {
              for(const elm of header.attributes) {
                //el.setAttribute(elm.name, elm.value);
              }
              for(const elm of header.children) {
                el.appendChild(elm);
              }
            }
          }} />
        });

        setDoc(xmlDoc);
      })
      .catch(err => setDoc(err));
  }, [ref]);

}
