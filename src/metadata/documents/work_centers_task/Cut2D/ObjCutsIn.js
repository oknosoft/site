import React from 'react';
import {Resize, ResizeHorizon} from 'metadata-ui/Resize';
import {NumberCell, NumberFormatter} from 'metadata-ui/DataField/Number';
import ObjTabular from 'metadata-ui/TabularSection';
import ObjCuttingSvg from './ObjCuttingSvg';
import {CutsInBtns} from './OptimizeCut';

export const columns = [
  {key: "stick", width: 80, name: "№ загот", tooltip: "№ листа (хлыста, заготовки)", renderCell: NumberFormatter, renderEditCell: NumberCell},
  //{key: "nom", width: 240, name: "Номенклатура", tooltip: "", renderCell: PresentationFormatter},
  {key: "len", width: 90, name: "Длина", tooltip: "длина в мм", renderCell: NumberFormatter, renderEditCell: NumberCell},
  {key: "width", width: 90, name: "Высота", tooltip: "ширина в мм", renderCell: NumberFormatter, renderEditCell: NumberCell},
  //{key: "x", width: 90, name: "X", tooltip: "", renderCell: NumberFormatter, renderEditCell: NumberCell},
  //{key: "y", width: 90, name: "Y", tooltip: "", renderCell: NumberFormatter, renderEditCell: NumberCell},
  {key: "quantity", name: "Количество", tooltip: "Количество в единицах хранения", renderCell: NumberFormatter, renderEditCell: NumberCell},
  //{key: "cell", width: 100, name: "Ячейка", tooltip: "№ ячейки (откуда брать заготовку или куда помещать деловой обрезок)", renderCell: TextFormatter}
];

const record_kind = $p.enm.debit_credit_kinds.debit;
const stub = () => null;
const style = {position: 'relative', height: 350};

export default function ObjCutsIn({obj, setBackdrop}) {

  const [selected, setRow] = React.useState({row: null});
  const selectedRowsChange = (rows) => {
    setRow({row: rows.size ? obj.cuts.find({row: Array.from(rows)[0]}) : null, rows});
  };

  const [ext, setExt] = React.useState(null);
  const buttons = <CutsInBtns obj={obj} setBackdrop={setBackdrop} ext={ext} setExt={setExt} selected={selected} mode="cuts"/>;
  const resize = () => {

  };

  //<ToolbarTabular clear={stub} create={stub} clone={stub} remove={stub} buttons={buttons}/>
  return <div style={style}>
    <Resize handleWidth="6px" onResizeStop={resize}  onResizeWindow={resize}>
      <ResizeHorizon width="400px" minWidth="320px">
        {ext ?
          <div style={{height: style.height - 50}}>
            {ext}
          </div> :
          <ObjTabular
            tabular={obj.cuts}
            columns={columns}
            rootStyle={{height: style.height - 50}}
            selectedRowsChange={selectedRowsChange}
            selection={{record_kind}}
            buttons={buttons}
          />
        }
      </ResizeHorizon>
      <ResizeHorizon overflow="hidden auto" minWidth="220px">
        <ObjCuttingSvg row={selected.row} height={style.height}/>
      </ResizeHorizon>
    </Resize>
  </div>;
}
