import React from 'react';
import {NumberFormatter, NumberCell} from 'metadata-ui/DataField/Number';
import ObjTabular from 'metadata-ui/TabularSection';
import {record_kind, nom} from './testData';

const columns = [
  {key: "len", name: "Заготовки", renderCell: NumberFormatter, renderEditCell: NumberCell},
];

export default function ObjCuts({obj}) {
  const tabRef = React.useRef(null);

  return <ObjTabular
    tabRef={tabRef}
    tabular={obj.cuts}
    columns={columns}
    selection={{record_kind, nom}}
  />;
}

