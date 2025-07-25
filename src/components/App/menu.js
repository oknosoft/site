import React from 'react';
import IconChart from '@mui/icons-material/InsertChart';
import IconDoc from '@mui/icons-material/EventNote';
import IconInfo from '@mui/icons-material/Info';
import IconPerson from '@mui/icons-material/Person';
import IconSettings from '@mui/icons-material/Settings';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import FiberNew from '@mui/icons-material/FiberNew';
import IconDownload from '@mui/icons-material/CloudDownload';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import IconHelp from '@mui/icons-material/Help';
import IconAccessibility from '@mui/icons-material/AccessibilityNew';
// import Flask from '../../styles/icons/Flask';
// import IconDrafts from '@mui/icons-material/Drafts';
// import IconList from '@mui/icons-material/List';

import description from '../../../server/articles/description';
export {description};

const items = [
  {
    text: 'Продукты',
    icon: <ShoppingBasket/>,
    id: 'products',
    //bold: true,
    navigate: '/products',
    need_meta: true,
  },
  {
    text: 'Статьи',
    icon: <LibraryBooks/>,
    id: 'articles',
    //bold: true,
    navigate: '/articles',
    need_meta: true,
  },
  {
    text: 'Файлы',
    icon: <IconDownload/>,
    id: 'files',
    //bold: true,
    navigate: '/files',
    need_meta: true,
  },
  // {
  //   text: 'Новости',
  //   icon: <FiberNew/>,
  //   id: 'news',
  //   //bold: true,
  //   navigate: '/news',
  //   need_meta: true,
  // },
  {
    divider: true,
  },
  {
    text: 'Профиль',
    navigate: '/login',
    need_meta: true,
    icon: <IconPerson/>
  },
  // {
  //   text: 'Настройки',
  //   navigate: '/settings',
  //   need_meta: true,
  //   icon: <IconSettings/>,
  // },
  {
    text: 'О компании',
    navigate: '/about',
    icon: <IconInfo/>
  }
];

function path_ok(path, item) {
  const pos = item.navigate && item.navigate.indexOf(path);
  return pos === 0 || pos === 1;
}

function with_recursion(path, parent) {
  if(path && path != '/'){
    for(const item of parent){
      const props = item.items ? with_recursion(path, item.items) : path_ok(path, item) && item;
      if(props){
        return props;
      }
    }
  }
}

export function item_props(path) {
  if(!path){
    path = location.pathname;
  }
  if(path.endsWith('/')) {
    path = path.substring(0, path.length - 1);
  }

  if(path.indexOf('password-reset') !== -1) {
    return {need_meta: true};
  }

  // здесь можно переопределить нужность meta и авторизованности для корневой страницы
  let res = with_recursion(path, items);
  if(!res && path.indexOf('/') !== -1) {
    res = with_recursion(path.substring(0, path.lastIndexOf('/')), items);
  }
  if(!res && path.match(/\/(doc|cat|ireg|cch|rep)\./)){
    res = {need_meta: true, need_user: false};
  }
  return res || {};
}

export default items;
