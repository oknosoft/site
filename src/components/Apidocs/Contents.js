import React from 'react';
import {useNavigate} from 'react-router';
import Typography from '@mui/material/Typography';

export default function Contents() {
  const rawNavigate = useNavigate();
  const navigate = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    rawNavigate(href);
  };
  return <>
    <Typography variant="h5" component="h1" color="primary">Описание API наших библиотек</Typography>
    <Typography component="a" href="/apidocs/wbcore" onClick={(e) => navigate(e, '/apidocs/wbcore')}>wbcore</Typography>
  </>;
}
