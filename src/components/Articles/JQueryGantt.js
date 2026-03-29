import React from 'react';
import Typography from '@mui/material/Typography';
import Helmet from 'react-helmet';
import { useNavigate, useLocation } from 'react-router';

const title = 'Диаграмма ганта';
const ltitle = {appTitle: <Typography variant="h6" noWrap>{title}</Typography>};

export default function JQueryGantt({doc, setTitle, height= 720}) {

  const navigate = useNavigate();
  const location = useLocation();

  function onLoad (attr) {
    attr.currentTarget.getGanttDoc = () => ({doc, navigate, location});
    setTitle(ltitle);
  }

  return <>
    <Helmet title={title}/>
    <iframe
      ref={(el) => el && el.contentWindow.addEventListener('DOMContentLoaded', onLoad, true)}
      title={title}
      style={{
        border: 'none',
        width: '100%',
        height,
      }}
      src="/lib/jQueryGantt/gantt.html">
    </iframe>
  </>;
}
