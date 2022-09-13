import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../../components/Home/Footer';
const components = {Footer};

export default function MarkdownComponents({handleIfaceState, handleNavigate, text}) {

  const xml = new DOMParser().parseFromString(text.substr(1, text.length -2),"text/xml");
  const elm = xml && xml.firstElementChild;
  if(elm) {
    const {tagName, attributes, children} = elm;
    const Component = components[tagName];
    if(Component) {
      if(children.length) {

      }
      else {
        return <Component handleIfaceState={handleIfaceState} handleNavigate={handleNavigate} />;
      }
    }
  }

  return null;
}
