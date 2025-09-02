import React from 'react';
import Loading from '../../../../components/App/Loading';
import Cut2D from './CutTabs';
import {obj} from './testData';

export default function Cut2DDemo() {

  const [ready, setReady] = React.useState(Boolean($p.classes.Cutting));

  React.useEffect(() => {
    if(!ready) {
      import('wb-cutting')
        .then((module) => {
          $p.classes.Cutting = module.default;
          setReady(true);
        });
    }
  }, []);

  return ready ? <Cut2D obj={obj}/> : <Loading/>;
}
