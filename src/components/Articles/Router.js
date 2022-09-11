/**
 * Маршрутизатор статей
 *
 * @module Router
 *
 * Created by Evgeniy Malyarov on 17.04.2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Routes, Route} from 'react-router-dom';

// import Articles from './Articles';
// import Contents from './Contents';
import Article from './Article';

class ArticlesRoute extends Component {

  render() {

    /* eslint-disable-next-line */
    const {classes, match, ...mainProps} = this.props;

    // <Route render={(props) => wraper(Articles, props)}/>

    return <Routes>
      <Route path=":ref" element={<Article {...mainProps}/>} />
    </Routes>;
  }
}

ArticlesRoute.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default ArticlesRoute;
