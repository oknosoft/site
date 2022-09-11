/**
 * Маршрутизатор верхнего уровня
 * {Главная, Настройки, Авторизация, Формы данных, Статьи}
 *
 * Created by Evgeniy Malyarov on 17.04.2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from '../Home';
import ArticlesRoute from '../Articles';

const DataRoute = () => 'DataRoute';
const FrmLogin = () => 'FrmLogin';

function AppRouter(props) {
  // const {match, handlers, offline, user} = this.props;
  // const {area, name} = match.params;

  const {classes, ...mainProps} = props;

  return <Router>
    <Routes>
      <Route exact path="/" element={<Home {...mainProps}/>}/>
      <Route path="/:area(doc|cat|ireg|cch|rep).:name" element={<DataRoute {...mainProps}/>}/>
      <Route path="/:area(login|settings|profile|password-reset)" element={<FrmLogin {...mainProps}/>}/>
      <Route element={<ArticlesRoute {...mainProps}/>}/>
    </Routes>
  </Router>;
}


AppRouter.propTypes = {
  //match: PropTypes.object.isRequired,
  //handlers: PropTypes.object.isRequired,
};

export default AppRouter;




