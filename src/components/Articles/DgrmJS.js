import React from 'react';

export default function DgrmJS({src, height=420}) {

  return <iframe
    title="Редактор диаграмм"
    style={{
      border: 'none',
      width: '100%',
      height,
    }}
    src="/lib/dgrmJS/index.html">
  </iframe>;
}
