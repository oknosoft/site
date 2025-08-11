import React from 'react';
import Loading from '../../../../components/App/Loading';
import Cut1D from './Demo';
import {obj} from './testData';

export default function Cut1DDemo() {

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

  return ready ? <Cut1D obj={obj}/> : <Loading/>;
}
