import styled from 'styled-components';
import { Provider } from './providers/Provider';
import { Router } from './router/Router';

export const App = () => {
  return (
    <Provider>
      <Main>
        <Container>
          <Router />
        </Container>
      </Main>
    </Provider>
  );
};

const Main = styled.main`
  position: relative;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;
