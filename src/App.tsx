import styled from 'styled-components';
import { Provider } from './providers/Provider';
import { Router } from './router/Router';

export const App = () => {
  return (
    <Provider>
      <_Main>
        <_Container>
          <Router />
        </_Container>
      </_Main>
    </Provider>
  );
};

const _Main = styled.main`
  position: relative;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const _Container = styled.div`
  width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;
