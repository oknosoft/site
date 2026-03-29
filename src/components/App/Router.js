/**
 * Маршрутизатор верхнего уровня
 * {Главная, Настройки, Авторизация, Формы данных, Статьи}
 *
 * Created by Evgeniy Malyarov on 17.04.2018.
 */

import React from 'react';
import {createBrowserRouter} from 'react-router';
import RootWithDrawer from './RootWithDrawer';

import Home from '../Home';
import Article from '../Articles/Article';
import Apidocs from '../Apidocs';
import FrmLogin from '../FrmLogin';

const DataRoute = () => 'DataRoute';
const loginRoute = <FrmLogin />;
const element = <RootWithDrawer />;


export const router = createBrowserRouter([
  {
    element,
    errorElement: element,
    children: [
      {path: "/", element: <Home />},
      {path: ":area.:name", element: <DataRoute />},
      {path: "login", element: loginRoute},
      {path: "profile", element: loginRoute},
      {path: "password-reset", element: loginRoute},
      {path: "apidocs/*", element: <Apidocs />},
      {path: "*", element: <Article />},
    ],
  },
]);





