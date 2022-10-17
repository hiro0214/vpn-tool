import { ReactNode, createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

export type DataType = {
  id: string;
  applicantName: string;
  applicantFirstName: string;
  applicantLastName: string;
  applicantMail: string;
  userName: string;
  userMail: string;
  startDate: string;
  endDate: string;
  firstAuthorizerName: string;
  firstAuthorizerMail: string;
  secondAuthorizerName: string;
  secondAuthorizerMail: string;
};

export type DataTypeKey =
  | 'id'
  | 'applicantName'
  | 'applicantFirstName'
  | 'applicantLastName'
  | 'applicantMail'
  | 'userName'
  | 'userMail'
  | 'startDate'
  | 'endDate'
  | 'firstAuthorizerName'
  | 'firstAuthorizerMail'
  | 'secondAuthorizerName'
  | 'secondAuthorizerMail';

export type UserListType = {
  name: string;
  firstName: string;
  lastName: string;
  mail: string;
};

export type DataContextType = {
  data: DataType[];
  csvData: string[][];
  setData: Dispatch<SetStateAction<DataType[]>>;
  setCsvData: Dispatch<SetStateAction<string[][]>>;
};

export const DataContext = createContext({} as DataContextType);

export const DataProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [data, setData] = useState([] as DataType[]);
  const [csvData, setCsvData] = useState([] as string[][]);

  return <DataContext.Provider value={{ data, csvData, setData, setCsvData }}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => useContext(DataContext);
