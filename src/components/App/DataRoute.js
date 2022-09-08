import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router';
import qs from 'qs';

import {withObj} from 'metadata-redux';
import NeedAuth, {ltitle} from 'metadata-react/App/NeedAuth'; // страница "необхлдима авторизация"

//import MetaObjPage from '../../components/MetaObjPage';
import NotFound from '../Pages/NotFound';

function DataRoute(props) {
  const {match, handlers, windowHeight, windowWidth, disablePermanent, couch_direct, offline, user} = this.props;
  const {area, name} = match.params;
  let _mgr = $p[area][name];

  if(!_mgr) {
    return <NotFound/>;
  }

  const _acl = $p.current_user.get_acl(_mgr.class_name);

  const dx = (windowWidth > 1280 && !disablePermanent) ? 280 : 0;

  const sizes = {
    height: windowHeight > 480 ? windowHeight - 52 : 428,
    width: windowWidth > 800 ? windowWidth - (windowHeight < 480 ? 20 : dx) : 800
  };

  const wraper = (Component, props, type) => {

    // уточняем _mgr для MultiManagers
    if(type === 'obj' && _mgr._indexer) {
      const prm = qs.parse(location.search.replace('?',''));
      if(prm.area && _mgr.cachable !== prm.area){
        _mgr._indexer._mgrs.some((mgr) => {
          if(mgr.cachable === prm.area){
            return _mgr = mgr;
          }
        });
      }
    }

    if(type === 'obj' && _mgr.FrmObj) {
      Component = _mgr.FrmObj;
    }
    else if(type === 'list' && _mgr.FrmList) {
      Component = _mgr.FrmList;
    }
    return <Component _mgr={_mgr} _acl={_acl} handlers={handlers} {...props} {...sizes} />;
  };

  if(area === 'rep') {
    const Component = _mgr.FrmObj || lazy.FrmReport;
    return <Component _mgr={_mgr} _acl={_acl} match={match} {...sizes} />;
  }

  return <Switch>
    <Route path={`${match.url}/:ref([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})`} render={(props) => wraper(lazy.DataObj, props, 'obj')}/>
    <Route path={`${match.url}/list`} render={(props) => wraper(lazy.DataList, props, 'list')}/>
    {/**<Route path={`${match.url}/meta`} render={(props) => wraper(MetaObjPage, props)} />**/}
    <Route component={NotFound}/>
  </Switch>;
}


DataRoute.propTypes = {
  match: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
  windowHeight: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  disablePermanent: PropTypes.bool,
  couch_direct: PropTypes.bool,
  offline: PropTypes.bool,
  user: PropTypes.object,
};

DataRoute.childContextTypes = {
  components: PropTypes.object,
};

export default DataRoute;




