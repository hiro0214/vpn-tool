import { FC, memo, ReactNode } from 'react';
import { DataProvider } from './DataProvider';

type props = {
  children: ReactNode;
};

export const Provider: FC<props> = memo((props) => {
  const { children } = props;

  return <DataProvider>{children}</DataProvider>;
});
