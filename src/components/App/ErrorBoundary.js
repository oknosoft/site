import * as React from 'react';
import {Outlet, useRouteError} from 'react-router';
import Loading from './Loading';

export default function ErrorBoundary({loaded}) {
  const error = useRouteError();
  if(error) {
    console.error(error);
    return <div>Dang!</div>;
  }
  if(!loaded) {
    return <Loading />;
  }
  return <Outlet />;
}
