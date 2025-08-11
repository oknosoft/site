import React from 'react';
import {NumberFormatter, NumberCell} from 'metadata-ui/DataField/Number';
import ObjTabular from 'metadata-ui/TabularSection';

const columns = [
  {key: "len", name: "Размеры изделий", renderCell: NumberFormatter, renderEditCell: NumberCell},
];

const record_kind = $p.enm.debit_credit_kinds.debit;

export default function ObjCutting({obj}) {
  const tabRef = React.useRef(null);

  return <ObjTabular
    tabRef={tabRef}
    tabular={obj.cutting}
    columns={columns}
  />;
}

