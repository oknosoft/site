import React from 'react';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {Toolbar, HtmlTooltip} from 'metadata-ui/App/styled';
import Progress from './Progress';
import Report1D from './Report';

export default function CutExecutor({obj, tab}) {
  const [statuses, setStatuses] = React.useState([]);
  const execute = () => {
    const onStep = state => {
      const {nom, characteristic} = state.cut_row;
      const states = [...statuses];
      let row;
      if(!states.some((elm) => {
        if(elm.nom === nom && elm.characteristic === characteristic) {
          row = elm;
          return true;
        }
      })) {
        row = {nom, characteristic};
        states.push(row);
      }
      Object.assign(row, state);

      setStatuses(states);
    };
    obj.reset_sticks('1D');
    obj.optimize({onStep})
      .then(state => {
        setTimeout(() => setStatuses([]), 200);
      })
      .catch(err => {
        err;
      });
  };
  return <>
    <Toolbar disableGutters>
      <HtmlTooltip title="Оптимизировать раскрой">
        <Button disabled={Boolean(statuses.length)} onClick={execute} startIcon={<PlayCircleOutlineIcon/>}>
          Запустить оптимизацию
        </Button>
      </HtmlTooltip>
    </Toolbar>
    {statuses.length ? <Progress status={statuses[0]} /> : <Report1D obj={obj} />}
  </>;
}
