import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import Params from './Params';
import CutExecutor from './Executor';

export default function CutTabs({obj}) {

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
        value={0}
        icon={<BarChartIcon/>}
        iconPosition="start"
        label="Раскрой"
      />
      <Tab
        value={1}
        icon={<TableChartIcon/>}
        iconPosition="start"
        label="Параметры"
      />
    </Tabs>
    {tab === 1 ? <Params obj={obj} /> : <CutExecutor obj={obj} tab={tab} />}
  </>;

}
