import { Login } from '../pages/Login';
import { Top } from '../pages/Top';

export const pageRoutes = [
  {
    path: '/',
    element: <Top />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];
