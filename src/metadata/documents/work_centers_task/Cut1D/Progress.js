/**
 * Created 27.09.2018
 */

import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

const styles = (theme) => ({
  bottom: {
    marginBottom: theme.spacing(2),
  },
  noPadding: {
    padding: 0,
  }
});

export function stat(status) {
  const {rows, workpieces, products_len, workpieces_len, scraps_percent, scraps_len, userData: {usefulscrap}} = status;
  return `${(products_len / 1000).toFixed(1)}м, ${rows.length}шт, Заготовок: ${
    (workpieces_len / 1000).toFixed(1)}м, ${workpieces.length}шт, Обрезь: ${
    (scraps_len / 1000).toFixed(1)}м, ${workpieces.reduce((sum, val) => val > usefulscrap ? sum + 1 : sum, 0)}шт, Отходы: ${
    ((workpieces_len - products_len - scraps_len) / 1000).toFixed(1)}м, ${scraps_percent.toFixed(1)}%`;
}

export default function Progress({status}) {
  const completed = status.progress * 100;
  const buffer = completed + Math.random() * 6;
  let primary = status.nom.name;
  if(status.parts > 1) {
    primary += ` (${status.part + 1} из ${status.parts})`;
  }

  return <div>
    <ListItemText primary={primary}/>
    <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer}/>
    <ListItemText secondary={stat(status)} />
  </div>;
}

