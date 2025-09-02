import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MarginIcon from '@mui/icons-material/Margin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import ObjCutsIn from './ObjCutsIn';
import {useBackdropContext} from '../../../../components/App/backdropContext';

export default function CutTabs({obj}) {

  const {setBackdrop} = useBackdropContext();
  const [tab, setTab] = React.useState(0);
  const handleTab= (event, newValue) => {
    setTab(newValue);
  };

  return <>
    <Tabs
      value={tab}
      onChange={handleTab}
    >
      <Tab
        value={1}
        icon={<MarginIcon/>}
        iconPosition="start"
        label="Изделия"
      />
      <Tab
        value={0}
        icon={<DashboardIcon/>}
        iconPosition="start"
        label="Заготовки и раскрой"
      />
      <Tab
        value={2}
        icon={<TableChartIcon/>}
        iconPosition="start"
        label="Параметры"
        disabled
      />
    </Tabs>
    {tab === 0 && <ObjCutsIn obj={obj} setBackdrop={setBackdrop}/>}
  </>;

}
