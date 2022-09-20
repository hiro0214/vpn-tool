import { memo } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { pageRoutes } from './PageRoutes';

export const Router = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        {pageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
});
