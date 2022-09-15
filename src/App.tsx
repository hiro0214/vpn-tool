import { Provider } from './providers/Provider';
import { Router } from './router/Router';

export const App = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};
