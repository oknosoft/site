import * as React from 'react';
import {Outlet, useRouteError} from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError();
  if(error) {
    console.error(error);
    return <div>Dang!</div>;
  }
  return <Outlet />;
}
