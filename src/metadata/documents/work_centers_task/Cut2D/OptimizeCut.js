import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SegmentIcon from '@mui/icons-material/Segment';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SwipeLeftOutlinedIcon from '@mui/icons-material/SwipeLeftOutlined';
import LayersIcon from '@mui/icons-material/Layers';
import {HtmlTooltip} from '../../../../components/App/styled';
import Loading from '../../../../components/App/Loading';

const Manual2DCutting = React.lazy(() => import('./Manual2DCutting'));
const Manual2DCuts = React.lazy(() => import('./Manual2DCuts'));

const {adapters: {pouch}, ui, utils, classes} = $p;
const dialogs = {};

function setSticks(obj, data) {
  if(data.error) {
    throw data;
  }
  const sticks = new Set();
  for(const row of data.scrapsIn) {
    let docRow = obj.cuts.find({stick: row.stick});
    if(!docRow) {
      throw new Error(`Нет заготовки №${row.stick}`);
    }
    if(sticks.has(docRow)) {
      docRow = obj.cuts.add(docRow);
      docRow.stick = row.id;
      docRow.quantity = row.quantity;
    }
    sticks.add(docRow);
    docRow.dop = {svg: row.svg};
  }
  for(const row of data.scrapsOut) {

  }
  for(const row of data.products) {
    const docRow = obj.cutting.get(row.id-1);
    if(!docRow) {
      throw new Error(`Нет отрезка №${row.id}`);
    }
    docRow.stick = row.stick;
    docRow.rotated = row.rotate;
    docRow.x = row.x;
    docRow.y = row.y;
  }
}

function noRow() {
  dialogs.alert({
    title: 'Ручной раскрой 2D',
    text: 'Не выбрана текущая строка',
  });
}

export function run2D(obj, setBackdrop) {
  //obj.reset_sticks('2D');
  return () => Promise.resolve(obj.fragments2D())
    .then((params) => {
      if(!params.products.length || !params.scraps.length) {
        throw new Error('В задании нет изделий или заготовок для раскроя 2D');
      }
      setBackdrop(true);
      return pouch.fetch('/adm/api/cut', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    })
    .then((res) => res.json())
    .then((data) => setSticks(obj, data))
    .then(() => setBackdrop(false))
    .catch((err) => {
      setBackdrop(false);
      dialogs.alert({
        title: 'Раскрой 2D',
        text: err?.message || err,
      });
    });
}

export default function OptimizeCut({obj, setBackdrop, ext, setExt, selected, mode}) {

  const state = React.useMemo(() => ({statuses: []}), [obj]);

  const report = () => {
    if(ext) {
      setExt(null);
    }
    else {
      setExt(ext);
    }
  };

  const malual = () => {
    if(ext) {
      setExt(null);
    }
    else {
      if(selected.rows?.size) {
        const Component = mode === 'cuts' ? Manual2DCuts : Manual2DCutting;
        const row = (mode === 'cuts' ? obj.cuts : obj.cutting).find({row: Array.from(selected.rows)[0]});
        setExt(<React.Suspense fallback={<Loading/>}>
          <Component obj={obj} row={row} setExt={setExt}/>
        </React.Suspense>);
      }
      else {
        noRow();
      }
    }
  };

  const reset_sticks = () => {
    setBackdrop(true);
    obj.reset_sticks();
    Promise.resolve().then(setBackdrop);
  };

  return <>
    <Divider orientation="vertical" flexItem sx={{m: 1}} />
    <HtmlTooltip title="Оптимизировать раскрой 2D">
      <IconButton onClick={run2D(obj, setBackdrop, setExt)}><ViewQuiltIcon/></IconButton>
    </HtmlTooltip>
    <HtmlTooltip title="Разместить вручную">
      <IconButton onClick={malual}><SwipeLeftOutlinedIcon/></IconButton>
    </HtmlTooltip>
    <HtmlTooltip title="Удалить данные оптимизации раскроя">
      <IconButton onClick={reset_sticks}><PlaylistRemoveIcon/></IconButton>
    </HtmlTooltip>
    <Box sx={{flex: 1}}/>
    <HtmlTooltip title="Статистика раскроя">
      <IconButton onClick={report}><AssessmentOutlinedIcon/></IconButton>
    </HtmlTooltip>
  </>;
}

export function CutsInBtns({obj, setBackdrop, ext, setExt, selected, mode}) {
  const fill_cuts = () => {
    setBackdrop(true);
    obj.fill_cuts();
    Promise.resolve().then(setBackdrop);
  };
  return <>
    <Divider orientation="vertical" flexItem sx={{m: 1}} />
    <HtmlTooltip title="Добавить типовые заготовки">
      <IconButton onClick={fill_cuts}><LayersIcon/></IconButton>
    </HtmlTooltip>
    <OptimizeCut obj={obj} setBackdrop={setBackdrop} ext={ext} setExt={setExt} selected={selected} mode={mode}/>
  </>;
}
