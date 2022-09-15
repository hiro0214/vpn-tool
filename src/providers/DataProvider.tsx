import { ReactNode, createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

export type DataType = {
  id: string;
  name: string;
};

export type DataContextType = {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
};

export const DataContext = createContext({} as DataContextType);

export const DataProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [data, setData] = useState([] as DataType[]);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => useContext(DataContext);
