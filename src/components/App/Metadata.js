/**
 * Невизуальный компонент, инициализирует метадату
 * и транслирует события адаптера в props потомков
 *
 * Created by Evgeniy Malyarov on 14.02.2021.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@mui/material';  // провайдер тема material=ui
import {createBrowserHistory} from 'history';
import Loading from './Loading';
import {actions, init_state} from './actions';      // события метадаты
import theme from '../../styles/muiTheme';                     // тема material=ui
import {item_props} from './menu';                        // конструкторы для контекста

const history = createBrowserHistory();

const handleNavigate = (url) => {
  history.push(url);
};

const handleEdit = ({ref, _mgr}) => {
  const {base} = $p.job_prm;
  return handleNavigate(`${base || ''}/${_mgr.class_name}/${ref}`);
};

class Metadata extends React.Component {

  constructor() {
    super();
    this.state = init_state;
  }

  handleIfaceState = ({component = '', name, value}) => {
    if(!component) {
      this.setState({[name]: value});
    }
  };

  handleNavigate(url) {
    handleNavigate(url);
  }

  componentDidMount() {
    // инициализируем MetaEngine
    actions(this);
  }


  render() {
    const {props: {App}, state, handleIfaceState} = this;
    const {...othes} = state;

    Object.assign(othes, {handlers: {handleIfaceState, handleNavigate, handleEdit}});

    let show_dumb = !othes.meta_loaded || !othes.common_loaded || !othes.complete_loaded;
    if(show_dumb && othes.common_loaded && !item_props().need_user) {
      show_dumb = false;
    }

    return <ThemeProvider theme={theme}>
      {show_dumb ?
        <Loading handleIfaceState={handleIfaceState} handleNavigate={handleNavigate} {...othes} />
        :
        <App handleIfaceState={handleIfaceState} handleNavigate={handleNavigate} history={history} {...othes}/>
      }
    </ThemeProvider>;
  }

  getChildContext() {
    const {handleIfaceState} = this;
    return {components: {}, history, handleIfaceState, handleNavigate};
  }
}

Metadata.childContextTypes = {
  components: PropTypes.object,
  history: PropTypes.object,
  handleIfaceState: PropTypes.func,
  handleNavigate: PropTypes.func,
};

Metadata.propTypes = {
  App: PropTypes.elementType.isRequired,
};

export default Metadata;
