import React from 'react';
import {Routes, Route} from 'react-router';
import Contents from './Contents';
import WbCore from './WbCore';

const contents = <Contents />;

export default function ApiRouter() {
  return <Routes>
    <Route path="/" element={contents} />
    <Route path="wbcore/*" element={<WbCore />} />
    <Route path="*" element={contents} />
  </Routes>;
}
