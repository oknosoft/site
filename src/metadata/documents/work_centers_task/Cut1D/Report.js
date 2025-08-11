import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import paper from 'paper/dist/paper-core.min';

import {stat} from './Progress';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media print': {
    width: '190mm',
    backgroundColor: theme.palette.common.white
  },
}));

const Data = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

const Nom = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Сanvas = styled('canvas')(({ theme }) => ({
  width: '100%',
}));


export default function Report1D(props) {
  return <Root>
    <Data><NomTable {...props}/></Data>
  </Root>;
}

// рисует таблицу по номенклатуре
function NomTable({obj}) {
  const res = [];
  const {debit_credit_kinds} = $p.enm;
  const _top = 10e6;

  // бежим по свёрнутой табчасти раскроя
  const fragments = obj.fragments1D(true);
  fragments.forEach((characteristics, nom) => {
    for(const [characteristic] of characteristics) {
      const crows = obj.cutting.find_rows({_top, nom, characteristic});
      const cuts_in = obj.cuts.find_rows({_top, record_kind: debit_credit_kinds.credit, nom, characteristic});
      const cuts_out = obj.cuts.find_rows({_top, record_kind: debit_credit_kinds.debit, nom, characteristic});

      const products_len = crows.reduce((sum, row) => sum + row.len, 0);
      const workpieces_len = cuts_in.reduce((sum, row) => sum + row.len, 0);
      const scraps_len = cuts_out.reduce((sum, row) => sum + row.len, 0);
      const knifewidth = nom.knifewidth || 7;
      const workpieces = cuts_in.map(({len, stick}) => {
        crows.forEach((row) => {
          if(stick === row.stick) {
            len -= (row.len + knifewidth);
          }
        });
        return len > 0 ? len : 0;
      });
      const scraps_percent = (workpieces_len - products_len - scraps_len - crows.length * knifewidth) * 100 / workpieces_len;

      const status = {
        rows: crows,
        cuts_in,
        workpieces,
        products_len,
        workpieces_len,
        scraps_len,
        scraps_percent: scraps_percent > 0 ? scraps_percent : 0,
        userData: {usefulscrap: 600, knifewidth}
      };

      res.push(<Nom key={nom.ref}>
        <Typography variant="h6">{nom.name}</Typography>
        <Typography variant="subtitle1">{stat(status)}</Typography>
        <Visualization status={status}/>
      </Nom>);
    }
  });
  return res;
}

class V1D extends paper.Project {

  redraw({userData, cuts_in, rows}) {

    this.clear();

    let x=0, h=88;

    for (let i = 0; i < cuts_in.length; i++) {

      const workpiece = cuts_in[i];
      const w = workpiece.len;
      const y = Math.round(h * 1.3) * i;

      new paper.Path({
        segments: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]],
        strokeColor: 'grey',
        strokeScaling: false,
        strokeWidth: 1,
        closed: true
      });

      const res = [];
      rows.forEach(({stick, len}) => {
        if(stick === workpiece.stick){
          res.push(len);
        }
      });
      res.sort((a, b) => b - a);
      res.reduce((sum, curr) => {
        new paper.Path({
          segments: [[x + sum + h / 2, y + 4], [x + sum + curr - h / 2, y + 4], [x + sum + curr, y + h - 4], [x + sum, y + h - 4]],
          fillColor: new paper.Color(Math.random() * 0.1 + 0.7, Math.random() * 0.2 + 0.8, Math.random() * 0.1 + 0.88),
          closed: true
        });
        new paper.PointText({
          point: [x + sum + curr / 2, y + 24 + h / 2],
          content: curr,
          fillColor: 'black',
          justification: 'center',
          fontSize: 72
        });
        return sum + curr + userData.knifewidth;
      }, 0);

    }

    this.zoom_fit();
    this.view.update();
  }

  zoom_fit () {

    var bounds = this.activeLayer && this.activeLayer.strokeBounds;

    if(bounds && bounds.height && bounds.width){
      this.view.zoom = Math.min((this.view.viewSize.height - 8) / bounds.height, (this.view.viewSize.width - 8) / bounds.width);
      this.view.center = bounds.center;
    }
  }

}

// рисует результат раскроя
function Visualization({status}) {
  return <Сanvas ref={(canvas) => {
    if(canvas) {
      canvas.height = status.cuts_in.length * 27 * canvas.width / 1530;
      const scheme = new V1D(canvas);
      scheme.redraw(status);
    }
  }}/>;
}


