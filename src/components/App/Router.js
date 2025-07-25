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
import ArticlesRoute from '../Articles/Article';

const DataRoute = () => 'DataRoute';
const FrmLogin = () => 'FrmLogin';
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
      {path: "*", element: <ArticlesRoute />},
    ],
  },
]);





