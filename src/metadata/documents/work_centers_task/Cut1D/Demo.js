import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ObjCuts from './Cuts';
import ObjCutting from './Cutting';

export default function Cut1D({obj}) {

  return <Grid container spacing={1} sx={{p: 1}}>
    <Grid size={{ xs: 12, md: 2 }}>
      <ObjCutting obj={obj} />
    </Grid>
    <Grid size={{ xs: 12, md: 2 }}>
      <ObjCuts obj={obj} />
    </Grid>
    <Grid size={{ xs: 12, md: 2 }}>
      Параметры
    </Grid>
    <Grid size={{ xs: 12, md: 6 }}>
      Оптимизация
    </Grid>
  </Grid>;
}
