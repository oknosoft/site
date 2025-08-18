import React from 'react';

export default function LightWinCalc() {
  React.useEffect(() => {
    const {utils} = $p;
    (window.$lwc ? Promise.resolve() :
      utils.load_script('/images/lightcalc/css/calc.css', 'link')
        .then(() => window.jQuery ? null : utils.load_script('https://code.jquery.com/jquery-1.12.4.min.js', 'script'))
        .then(() => utils.load_script('/images/lightcalc/js/mono.js', 'script')))
      .then(() => {
        $lwc.init();
      });
  }, []);
  return <div id="lwcdiv" />;
}
